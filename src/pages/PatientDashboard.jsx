import {useAppContext} from "../context/AppContext";
import {useEffect, useState} from "react";
import {getAllIncidents, getAllPatients} from "../utils/datautil";

const PatientDashboard = () => {

    const {user, logout} = useAppContext();
    const [patient, setPatient] = useState(null);
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        const allPatients = getAllPatients();
        const myData = allPatients.find((p) => p.id === user.patientId);
        setPatient(myData);

        const allIncidents = getAllIncidents();
        const myIncidents = allIncidents.filter((i) => i.patientId === user.patientId);
        setIncidents(myIncidents);
    }, [user]);

    return (<div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Patient Dashboard</h2>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            {patient ? (<div className="bg-white p-4 rounded shadow mb-6">
                    <h3 className="text-xl font-semibold mb-2">Your Profile</h3>
                    <p><strong>Name:</strong> {patient.name}</p>
                    <p><strong>DOB:</strong> {patient.dob}</p>
                    <p><strong>Contact:</strong> {patient.contact}</p>
                    <p><strong>Health Info:</strong> {patient.healthInfo}</p>
                </div>) : (<p className="text-gray-600 mb-4">Patient record not found.</p>)}

            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-4">Your Appointments</h3>
                {incidents.length === 0 ? (<p className="text-gray-600">No appointments found.</p>) : (
                    <ul className="space-y-4">
                        {incidents.map((incident) => (<li key={incident.id} className="border-b pb-4">
                                <p><strong>Title:</strong> {incident.title}</p>
                                <p><strong>Date:</strong> {new Date(incident.appointmentDate).toLocaleString()}</p>
                                <p><strong>Status:</strong> {incident.status}</p>
                                {incident.treatment && (<p><strong>Treatment:</strong> {incident.treatment}</p>)}
                                {incident.cost && (<p><strong>Cost:</strong> ₹{incident.cost}</p>)}
                                {incident.files && incident.files.length > 0 && (<div>
                                        <p className="font-medium mt-2">Files:</p>
                                        <ul className="list-disc ml-6">
                                            {incident.files.map((file, index) => (
                                                <div key={index} className="mb-2 flex items-center space-x-2">
                                                    <span className="text-sm text-gray-700">{file.name}</span>
                                                    <button
                                                        onClick={() => {
                                                            const newWindow = window.open();
                                                            if (newWindow) {
                                                                newWindow.document.write(`
                                                                        <html>
                                                                          <head><title>${file.name}</title></head>
                                                                          <body style="margin:0">
                                                                            ${file.url.startsWith("data:image") 
                                                                        ? `<img src="${file.url}" style="max-width:100%;max-height:100vh;"/>` 
                                                                        : `<embed src="${file.url}" width="100%" height="100%" type="application/pdf"/>`}
                                                                          </body>
                                                                        </html>
          `);
                                                            } else {
                                                                alert("Popup blocked! Please allow popups for this site.");
                                                            }
                                                        }}
                                                        className="text-blue-600 text-sm underline hover:text-blue-800"
                                                    >
                                                        Preview
                                                    </button>
                                                </div>))}

                                        </ul>
                                    </div>)}
                            </li>))}
                    </ul>)}
            </div>
        </div>);

}

export default PatientDashboard;