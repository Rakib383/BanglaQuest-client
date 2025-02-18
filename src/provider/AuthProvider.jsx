import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useAxiosPublic } from "../hooks/useAxiosPublic";
import PropTypes from "prop-types";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const provider = new GoogleAuthProvider();

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const updateUserProfile = async (name, photoURL) => {
        if (!auth.currentUser) return;
        return updateProfile(auth.currentUser, { displayName: name, photoURL });
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            return result;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const resetPassword = async (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const logOut = async () => {
        setLoading(true);
        await signOut(auth);
        localStorage.removeItem("access-token");
        setUser(null);
        setLoading(false);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser?.email) {
                try {
                    const res = await axiosPublic.post("/jwt", { email: currentUser.email });
                    if (res.data.token) {
                        localStorage.setItem("access-token", res.data.token);
                    }
                    setUser(currentUser);
                } catch (error) {
                    console.error("Token generation failed", error);
                    localStorage.removeItem("access-token");
                    setUser(null);
                }
            } else {
                localStorage.removeItem("access-token");
                setUser(null);
            }
            setLoading(false);
        });

        return () => unSubscribe();
    }, [axiosPublic]);

    const authInfo = {
        createUser,
        user,
        setUser,
        setLoading,
        loading,
        signIn,
        signInWithGoogle,
        updateUserProfile,
        logOut,
        resetPassword,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

