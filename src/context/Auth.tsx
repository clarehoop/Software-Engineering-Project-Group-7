import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth"; // signOut imported here
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Define the logout function
    const logout = async () => {
        try {
            await signOut(auth);
            // No need to manually setUser(null) here because 
            // onAuthStateChanged below will detect the logout and do it for you.
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                if (userDoc.exists()) {
                    setUser({ ...firebaseUser, ...userDoc.data() });
                } else {
                    setUser(firebaseUser);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        // 2. Add logout to the Provider value
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}