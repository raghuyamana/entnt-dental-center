import {Link} from "react-router-dom";

const Home = () => {
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">
                Welcome to ENTNT Dental Center
            </h1>
            <p className="text-gray-600 mb-6 text-center max-w-md">
                This portal helps manage dental appointments, patient records and treatment files.
            </p>
            <Link to="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >Login
            </Link>
        </div>
    )
}

export default Home;