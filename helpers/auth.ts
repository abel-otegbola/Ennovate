import { doc, getDoc, setDoc } from "firebase/firestore";
import { emptyUserProfile, User } from "../interface/auth";
import { User as FirebaseUser } from "firebase/auth";
import { db } from "../firebase/firebase";


export const getUserFromAuth = async (firebaseUser: FirebaseUser): Promise<User> => {
    const userReference = doc(db, 'users', firebaseUser.uid);
    const userSnapshot = await getDoc(userReference);
    const profile = userSnapshot.exists() ? userSnapshot.data() : {};

    return {
        ...emptyUserProfile,
        ...profile,
        id: firebaseUser.uid,
        email: firebaseUser.email ?? '',
        fullname: firebaseUser.displayName ?? profile.fullname ?? '',
        avatar: firebaseUser.photoURL ?? profile.avatar ?? '',
        verified: firebaseUser.emailVerified,
    } as User;
};

export const createUserProfile = async (firebaseUser: FirebaseUser): Promise<User> => {
    const user: User = {
        ...emptyUserProfile,
        id: firebaseUser.uid,
        email: firebaseUser.email ?? '',
        fullname: firebaseUser.displayName ?? '',
        avatar: firebaseUser.photoURL ?? '',
        verified: firebaseUser.emailVerified,
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), user);
    return user;
};
