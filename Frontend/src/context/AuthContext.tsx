import { createContext, useState, useContext } from "react";
import { type User, type AuthContextType } from "../types/authTypes";


export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);   //this loading is just for auth context
    const logout = () => {
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ user, setUser, logout, isAuthenticated: !!user,loading,setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

//here we are storing the user data in the context
//here we are using !!user to convert the user to boolean, if user is null then it will be false, if user is not null then it will be true

