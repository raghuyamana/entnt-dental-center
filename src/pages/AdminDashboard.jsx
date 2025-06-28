import {useState} from "react";
import DashboardView from "../components/admin/DashboardView";
import PatientManagement from "../components/admin/PatientManagement";
import AppointmentManagement from "../components/admin/AppointmentManagement";
import CalendarView from "../components/admin/CalendarView";

const AdminDashboard = () => {

    const TABS = ["Dashboard", "Patients", "Appointments", "Calendar"];
    const [activeTab, setActiveTab] = useState("Dashboard");
    return(
        <div className="min-h-screen flex">
        {/*    SideBar  */}
         <aside className="w-60 bg-gray-700 text-white p-4 space-y-4">
             <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
             {TABS.map((tab) => (
                 <button
                    key={tab}
                    className={`block w-full text-left px-4 py-2 rounded hover:bg-gray-800"} ${
                     activeTab === tab ? "bg-gray-800" : ""
                    } `}
                    onClick={() => setActiveTab(tab)}

                 >
                     {tab}
                 </button>
             ))}
         </aside>
        {/*  Main Content  */}
            <main className="flex-1 p-6 bg-gray-50">
                {activeTab === "Dashboard" && <DashboardView />}
                {activeTab === "Patients" && <PatientManagement />}
                {activeTab === "Appointments" && <AppointmentManagement />}
                {activeTab === "Calendar" && <CalendarView />}

            </main>
        </div>
    )


}

export default AdminDashboard;