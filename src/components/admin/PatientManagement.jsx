import {useEffect, useState} from "react";
import {addPatient, deletePatient, getAllPatients, updatePatient} from "../../utils/datautil";

const PatientManagement = () => {
    const initialForm = {id: "", name:"", dob: "", contact: "", healthInfo: ""};

    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState(initialForm);
    const [editing, setEditing] = useState(false);

        useEffect(() => {
            setPatients(getAllPatients());
        }, []);

        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        if (
            !formData.name.trim() ||
            !formData.dob ||
            !formData.contact.trim() ||
            !formData.healthInfo.trim()
        ) {
            alert("Please fill in all patient fields.");
            return;
        }

        const payload = { ...formData };

        if (editing) {
            updatePatient(payload);
        } else {
            payload.id = Date.now().toString();
            addPatient(payload);
        }

        setFormData(initialForm);
        setEditing(false);
        setPatients(getAllPatients());


    const handleEdit = (patient) => {
        setFormData(patient);
        setEditing(true);
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure want to delete this patient?")){
            deletePatient(id);
            setPatients(getAllPatients());
        }
    };

    return(
        <div>
            <h2 className="text-2xl font-semibold mb-4">Patient Management</h2>

        {/*  Patient Form  */}
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
                <h3 className="text-xl font-medium">{editing ? "Edit" :"Add"} Patient</h3>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={"border p-2 rounded"}
                    />
                    <input
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        className={"border p-2 rounded"}
                    />
                    <input
                        name="contact"
                        placeholder="Contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        className={"border p-2 rounded"}
                    />
                    <input
                        name="healthInfo"
                        placeholder="Health Information"
                        value={formData.healthInfo}
                        onChange={handleChange}
                        required
                        className={"border p-2 rounded"}
                    />
                </div >
                <div className="flex space-x-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {editing ? "Update" : "Add"} Patient
                    </button>
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2  rounded hover:bg-gray-600"
                        onClick={() => {
                            setFormData(initialForm);
                            setEditing(false);
                    } }
                    >Cancel</button>
                </div>
            </form>
        {/*  Patients Table  */}
            <table className="w-full bg-white shadow rounded">
                <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="p-3">Name</th>
                    <th>DOB</th>
                    <th>Contact</th>
                    <th>Health Info</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {patients.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="p-4 text-center text-gray-500">
                            No Patients Found
                        </td>
                    </tr>
                ) : (
                    patients.map((patient) => (
                        <tr key={patient.id} className="border-t">
                            <td className="p-3">{patient.name}</td>
                            <td>{patient.dob}</td>
                            <td>{patient.contact}</td>
                            <td>{patient.healthInfo}</td>
                            <td>
                                <button
                                    onClick={() => handleEdit(patient)}
                                    className="text-blue-600 hover:underline mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(patient.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>


    )
}

export default PatientManagement;