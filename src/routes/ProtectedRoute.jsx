import {useAppContext} from "../context/AppContext";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children, allowedRoles}) => {
    const {user} = useAppContext();

    if(!user){
        return <Navigate to="/login" replace />
    }

    if(allowedRoles && !allowedRoles.includes(user.role)){
        return <Navigate to="/unauthorized" replace />
    }
    return children;
}

export default ProtectedRoute;