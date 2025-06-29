import {useEffect, useState} from "react";
import {getAllIncidents, getAllPatients} from "../../utils/datautil";

const DashboardView = () => {
        const [patients, setPatients] = useState([]);
        const [incidents, setIncidents] = useState([]);

        useEffect(() => {
            setPatients(getAllPatients());
            setIncidents(getAllIncidents());
        }, []);

        const sortedIncidents = [...incidents].sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

        const nextAppointments = sortedIncidents.slice(0, 10);

        const patientCounts = patients.map((p) => {
            const count = incidents.filter((i) => i.patientId === p.id).length;
            return {...p, count};
        });

        const topPatients = [...patientCounts]
            .sort((a, b) => b.count - a.count)
            .slice(0, 3);

        const pending = incidents.filter((i) => i.status === "pending").length;
        const completed = incidents.filter((i) => i.status === "completed").length;

        const revenue = incidents.reduce((sum, i) => {
            return sum + (parseFloat(i.cost) || 0);
        }, 0);

        return (<div>
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <KpiCard title="Upcoming Appointments" value={nextAppointments.length}/>
                <KpiCard title="Pending Treatments" value={pending}/>
                <KpiCard title="Completed Treatments" value={completed}/>
                <KpiCard title="Total Revenue" value={`₹ ${revenue}`}/>
            </div>

            <section className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Next 10 Appointments</h3>
                <ul className="space-y-2 bg-white p-4 rounded shadow text-sm">
                    {nextAppointments.map((i) => (<li key={i.id} className="border-b pb-2">
                        <p>
                            <strong>{patients.find((p) => p.id === i.patientId)?.name || "Unknown"}</strong>{" "}
                            - {i.title} at {new Date(i.appointmentDate).toLocaleString()}
                        </p>
                    </li>))}
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-semibold mb-2">Top Patients</h3>
                <ul className="space-y-2 bg-white p-4 rounded shadow text-sm">
                    {topPatients.map((p, i) => (<li key={p.id} className="border-b pb-2">
                        #{i + 1}. {p.name} - {p.count} appointments
                    </li>))}
                </ul>
            </section>
        </div>);


        function KpiCard({title, value}) {
            return (<div className="bg-white p-4 rounded shadow text-center">
                <h4 className="text-sm text-gray-600 mb-1">{title}</h4>
                <p className="text-xl font-bold text-blue-700">{value}</p>
            </div>);

        }
}

export default DashboardView;