import {useEffect, useState} from "react";
import {getAllIncidents, getAllPatients} from "../../utils/datautil";

const CalendarView = () => {
    const [incidents, setIncidents] = useState([]);
    const [patients, setPatients] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        setIncidents(getAllIncidents);
        setPatients(getAllPatients);
    },[]);

    const incidentsByDate = incidents.reduce((acc, incident) => {
        const dateKey = incident.appointmentDate.split("T")[0];
        if(!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(incident);
        return acc;
    },{});

    const today = new Date();
    const days = Array.from({length:30}, (_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() + i);
        return d.toISOString().split("T")[0];
    });

    return(
        <div>
            <h2 className="text-2xl font-semibold mb-4">Calendar View</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3 mb-6">
                {days.map((date) => (
                    <div
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 border rounded cursor-pointer ${
                            incidentsByDate[date]
                                ? "bg-blue-100 border-blue-600"
                                : "bg-white"
                        }`}
                    >
                        <p className="font-medium">{new Date(date).toDateString()}</p>
                        <p className="text-sm text-gray-600">
                            {incidentsByDate[date]?.length || 0} Appointments
                        </p>
                    </div>
                ))}
            </div>

            {selectedDate && (
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-xl font-bold mb-4">
                        Appointments on {new Date(selectedDate).toDateString()}
                    </h3>
                    {incidentsByDate[selectedDate]?.length > 0 ? (
                        <ul className="space-y-3">
                            {incidentsByDate[selectedDate].map((incident) => (
                                <li key={incident.id} className="border-b pb-2">
                                    <p className="font-medium">
                                        Patient:
                                        {
                                            " "+ patients.find((p) => p.id === incident.patientId)?.name
                                        }
                                    </p>
                                    <p>Title: {incident.title}</p>
                                    <p>Time: {new Date(incident.appointmentDate).toLocaleTimeString()}</p>
                                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                        incident.status === 'completed' ?
                                            "bg-green-100 text-green-800" :
                                            incident.status === 'pending' ?
                                                "bg-yellow-100 text-yellow-800" :
                                                "bg-gray-100 text-gray-800"
                                    }`}>
                                        {incident.status}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No appointments on this date.</p>
                    )}
                </div>
            )}
        </div>
    );
}


export default CalendarView;