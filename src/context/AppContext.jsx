import {createContext, useContext, useEffect, useState} from "react";

const AppContext = createContext();

const USERS = [
    { id:"1", role:"Admin", email:"admin@entnt.in", password:"admin123"},
    { id:"2", role:"User", email: "raghu@entnt.in", password:"raghu123", patientId:"1751186208933"},
];

export const AppProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if(storedUser) {
            setUser(JSON.parse(storedUser));
        }
    },[]);

    const login = (email, password) => {
        const user = USERS.find(
            (u) => u.email === email && u.password === password
        );
        if (user) {
            setUser(user);
            localStorage.setItem("currentUser", JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: "Invalid credentials" };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("currentUser");
    };

    return(
        <AppContext.Provider value={{user, login, logout}}>
            {children}
        </AppContext.Provider>
    );
};


export const useAppContext = () => useContext(AppContext);