import {Route, BrowserRouter as  Router, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {Toaster} from "react-hot-toast";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import PatientDashboard from "./pages/PatientDashboard";

const App = () => {
    return(


        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <Router>
                <Routes>
                    <Route path={"/"} element={<Home/>} />
                    <Route path={"/login"} element={<Login />} />


                <Route path={"/unauthorized"} element={<Unauthorized />} />

                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/patient/*"
                    element={
                        <ProtectedRoute allowedRoles={["User"]}>
                            <PatientDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            </Router>
        </>
        
    );

}

export default App;