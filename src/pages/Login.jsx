import {useAppContext} from "../context/AppContext";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
    const {login} = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const result = login(email, password);
        if(result.success){
            toast.success("Login Successful");
            if(result.user.role === "Admin"){
                navigate("/admin");
            }else{
                navigate("/patient");
            }
        }else{
            toast.error(result.message);
            setEmail("");
            setPassword("");
            setError(result.message);
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounder shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-sm">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange = {(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-sm">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}
                            required
                            className = "w-full border border-gray-300 px-3 py-2 rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;