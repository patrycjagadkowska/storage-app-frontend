import { createContext, useState, useEffect } from "react";

import { validateTokenExpiration } from "../constants/validationFns";

const initData = {
    isLoggedIn: false,
    login: (userId) => {},
    userId: undefined,
    logout: () => {}
};

export const AuthContext = createContext(initData);

const AuthProvider = ({ children }) =>{
    const [ userId, setUserId ] = useState(undefined);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const expiresIn = localStorage.getItem("expiresIn");
        const tokenNotExpired = validateTokenExpiration(expiresIn);
        if (token && userId && tokenNotExpired) {
            login(userId);
        }
    }, []);

    const login = (userId) => {
        setUserId(userId);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserId(undefined);
    };

    const contextValue = {
        userId,
        isLoggedIn,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;