import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { app, db } from "./firebase";


export const auth = getAuth(app);

export const signUp = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            email: user.email,
        });
        return user
    } 
    catch (error) {
        return {error: "An error occured! Please try again"}
    }
};

export const signIn = async (email:string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        return user
    } 
    catch (error) {
        return {error: "An error occured! Please try again"}
    }
}

export const logOut = async() => {
    try {
        await signOut(auth)
        return true
    } 
    catch (error) {
        return false
    }
};