import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect } from 'react';

export const AuthContext = createContext<null | any >(null);

import { useLocalStorage } from "./useLocalStorage";
import { app } from "../firebase/firebase";
const auth = getAuth(app)

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useLocalStorage("user", null);

    useEffect(() => {
        onAuthStateChanged(auth,(user) => {
            setUser(user)
        })
    }, [setUser]);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}