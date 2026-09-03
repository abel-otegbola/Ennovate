'use client'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, signOut, User as FirebaseUser } from "firebase/auth";
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../customHooks/useLocaStorage";
import { app, db } from "../firebase/firebase";
import { createUserProfile, getUserFromAuth } from "@/helpers/auth";
import { doc, getDoc } from "firebase/firestore";
import { User } from "@/interface/auth";

type AuthAction = (email: string, password: string) => Promise<void>;
type SocialAuthAction = () => Promise<void>;

export const AuthContext = createContext<{ 
    signIn: AuthAction; 
    signUp: AuthAction; 
    signInWithGoogle: SocialAuthAction;
    logOut: () => Promise<void>; user: User | null; 
    popup: { type: string; msg: string }; 
    loading: boolean; 
    setPopup: (popup: { type: string; msg: string }) => void }>({ signIn: async () => {}, signUp: async () => {}, signInWithGoogle: async () => {}, logOut: async () => {}, user: null, popup: { type: "", msg: "" }, loading: false, setPopup: () => {} 
});

const auth = getAuth(app)

const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [, setStoredUser] = useLocalStorage("user", null);
    const [user, setUser] = useState<User | null>(null);
    const [popup, setPopup] = useState({ type: "", msg: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter()


    const syncUser = useCallback(async (firebaseUser: FirebaseUser) => {
        const appUser = await getUserFromAuth(firebaseUser);
        setUser(appUser);
        if(setStoredUser)setStoredUser(appUser);
        return appUser;
    }, [setStoredUser]);

    const signIn: AuthAction = async (email, password) => {
        setLoading(true)

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await syncUser(userCredential.user);
            setPopup({ type: "success", msg: "Login Successful" });
            router.push("/discover");
        } catch (error) {
            setPopup({ type: "error", msg: error instanceof Error ? error.message.replace("Firebase: Error", "") : "Login failed" });
        } finally {
            setLoading(false);
        }
    }

    const signUp: AuthAction = async (email, password) => {
        setLoading(true)

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const appUser = await createUserProfile(userCredential.user);
            setUser(appUser);
            if(setStoredUser)setStoredUser(appUser);
            setPopup({ type: "success", msg: "Signup Successful" });
            router.push("/discover");
        } catch (error) {
            setPopup({ type: "error", msg: error instanceof Error ? error.message.replace("Firebase: Error", "") : "Signup failed" });
        } finally {
            setLoading(false);
        }
    }

    const signInWithGoogle: SocialAuthAction = async () => {
        setLoading(true)

        try {
            const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
            const userReference = doc(db, 'users', userCredential.user.uid);
            const userSnapshot = await getDoc(userReference);
            const appUser = userSnapshot.exists()
                ? await syncUser(userCredential.user)
                : await createUserProfile(userCredential.user);

            setUser(appUser);
            if(setStoredUser)setStoredUser(appUser);
            setPopup({ type: "success", msg: "Login Successful" });
            router.push("/discover");
        } catch (error) {
            setPopup({ type: "error", msg: error instanceof Error ? error.message.replace("Firebase: Error", "") : "Google login failed" });
        } finally {
            setLoading(false);
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
            if(setStoredUser)setStoredUser(null);
            setPopup({ type: "success", msg: "Logout Successful" });
        } catch (error) {
            setPopup({ type: "error", msg: error instanceof Error ? error.message.replace("Firebase: Error", "") : "Logout failed" });
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (!firebaseUser) {
                setUser(null);
                if(setStoredUser)setStoredUser(null);
                return;
            }

            syncUser(firebaseUser).catch((error) => {
                setPopup({ type: "error", msg: error instanceof Error ? error.message : "Unable to load user profile" });
            });
        });

        return unsubscribe;
    }, [setStoredUser, syncUser]);

    useEffect(() => {
        if (popup?.type === "success") {
            toast.success(popup.msg)
        }
        if (popup?.type === "error") {
            toast.error(popup.msg);
        }
      }, [popup]);

    return (
        <AuthContext.Provider value={{ user, popup, loading, setPopup, signIn, signUp, signInWithGoogle, logOut }}>
            <Toaster containerClassName="p-8" />
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;