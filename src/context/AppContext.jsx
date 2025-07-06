import {createContext, useContext, useEffect, useState} from "react";

const AppContext = createContext();

const USERS = [
    { id:"1", role:"Admin", email:"admin@entnt.in", password:"admin123"},
    { id:"2", role:"User", email: "user@entnt.in", password:"user123", patientId:"1751808518825"},
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
        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        console.log("Login attempt:", cleanEmail, cleanPassword);

        const user = USERS.find(
            (u) =>
                u.email.toLowerCase() === cleanEmail &&
                u.password === cleanPassword
        );

        console.log("Matched user:", user);

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