import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import axios from "axios";

interface AuthContextType {
    isWorker: boolean,
    isAdmin: boolean,
    login: (username: string, password: string) => Promise<void>,
    logout: () => void,
}

const AuthContext = createContext<AuthContextType>({
    isWorker: false,
    isAdmin: false,
    login: async () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        try {
            axios.get('/auth/check', { withCredentials: true })
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        }
    })

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);