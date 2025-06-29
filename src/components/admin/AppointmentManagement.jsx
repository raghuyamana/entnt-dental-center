import {useEffect, useRef, useState} from "react";
import {addIncident, deleteIncident, getAllIncidents, getAllPatients, updateIncident} from "../../utils/datautil";

const AppointmentManagement = () => {

    const initialForm = {
        id: "",
        patientId: "",
        title: "",
        description: "",
        comments: "",
        appointmentDate: "",
        cost: "",
        treatment: "",
        status: "",
        nextDate: "",
        files: [],
    }

    const fileInputRef = useRef(null);

    const [incidents, setIncidents] = useState([]);
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState(initialForm);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        setPatients(getAllPatients());
        setIncidents(getAllIncidents());
    }, []);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        const base64Files = await Promise.all(files.map(async (file) => {
            const base64 = await toBase64(file);
            return {
                name: file.name, url: base64,
            };
        }));

        setFormData({...formData, files: base64Files})
    }

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {...formData}
        if (editing) {
            updateIncident(formData);
        } else {
            payload.id = Date.now().toString();
            addIncident({...formData, id: Date.now().toString()});
        }
        setFormData(initialForm);
        setEditing(false);
        setIncidents(getAllIncidents());

    }

    const handleEdit = (incident) => {
        setFormData(incident);
        setEditing(true);
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete this incident?")) {
            deleteIncident(id);
            setIncidents(getAllIncidents());
        }
    };


    return (<div>
            <h2 className="text-2xl font-semibold mb-4">Appointment Management</h2>
            {/*  Form  */}
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
                <h3 className="text-xl font-medium">{editing ? "Edit" : "Add"} Incident</h3>
                <div className="grid grid-cols-2 gap-4">
                    <select name="patientId"
                            className="border p-2 rounded"
                            value={formData.patientId}
                            onChange={handleChange}
                            required
                    >
                        <option value="">Select Patient</option>
                        {patients.map((patient) => (<option key={patient.id} value={patient.id}>
                                {patient.name}
                            </option>))}
                    </select>
                    <input type="datetime-local"
                           className="border p-2 rounded"
                           value={formData.appointmentDate}
                           onChange={handleChange}
                           required
                           name="appointmentDate"
                    />
                    <input
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className={"border p-2 rounded"}
                    />
                    <input
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className={"border p-2 rounded"}
                    />
                    <input
                        name="comments"
                        placeholder="Comments"
                        value={formData.comments}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <input
                        name="cost"
                        placeholder="Cost"
                        type="number"
                        value={formData.cost}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <input
                        name="treatment"
                        placeholder="Treatment"
                        value={formData.treatment}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    >
                        <option value="">Select Status</option>
                        <option value='pending'>Pending</option>
                        <option value='completed'>Completed</option>
                    </select>
                    <input type="date"
                           name="nextDate"
                           value={formData.nextDate}
                           onChange={handleChange}
                           className="border p-2 rounded"
                    />
                    <input type="file"
                           onChange={handleFileChange}
                           multiple
                           ref={fileInputRef}
                           className="border p-2 rounded col-span-2"
                    />
                    {formData.files.length > 0 && (<div className="col-span-2">
                            <h4 className="font-medium mb-2">Selected Files:</h4>
                            <ul className="list-doc ml-5 text-sm text-gray-700">
                                {formData.files.map((file, index) => (<li key={index}>{file.name}
                                        <button
                                            className="text-red-500 text-xs hover:underline ml-2"
                                            type="button"
                                            onClick={() => {
                                                setFormData((prev) => ({
                                                    ...prev, files: prev.files.filter((_, i) => i !== index),
                                                }));
                                            }}
                                        >Remove
                                        </button>
                                    </li>))}
                            </ul>
                        </div>)}
                </div>
                <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        {editing ? "Update" : "Add"} Appointment
                    </button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded"
                            onClick={() => {
                                setFormData(initialForm);
                                setEditing(false);
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = null;
                                }
                            }}>Cancel
                    </button>
                </div>
            </form>

            {/*  Table  */}
            <table className="w-full bg-white shadow rounded">
                <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="p-3">Patient</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Files</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {incidents.length === 0 ? (<tr>
                        <td className="p-4 text-center text-gray-500" colSpan={"6"}>
                            No appointments found
                        </td>
                    </tr>) : (incidents.map((incident) => (<tr key={incident.id} className="border-t">
                            <td className="p-3">
                                {patients.find((patient) => patient.id === incident.patientId)?.name || "Unknown"}
                            </td>
                            <td>{incident.title}</td>
                            <td>{new Date(incident.appointmentDate).toLocaleString()}</td>
                            <td>{incident.status}</td>
                            <td>
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

                            </td>
                            <td>
                                <button
                                    onClick={() => handleEdit(incident)}
                                    className="text-blue-600 hover:underline mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(incident.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>)))}
                </tbody>
            </table>
        </div>)
}

export default AppointmentManagement;