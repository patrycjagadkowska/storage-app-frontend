import { createContext, useState } from "react";

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