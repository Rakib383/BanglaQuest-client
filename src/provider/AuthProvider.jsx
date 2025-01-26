import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useAxiosPublic } from './../hooks/useAxiosPublic';
import PropTypes from "prop-types";
import { app } from './../firebase/firebase.config';

export const AuthContext = createContext(null)
const auth = getAuth(app)


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
    const provider = new GoogleAuthProvider()
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL
        })
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider)
    }
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
    const logOut = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {

            if (currentUser?.email) {

                axiosPublic.post("/jwt", { email: currentUser.email })
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            setUser(currentUser)
                        }

                        setLoading(false)
                    })
            }
            else {
                localStorage.removeItem('access-token')
                setUser(currentUser)
                setLoading(false)

            }
        })

        return () => {
            unSubscribe()
        }
    }, [axiosPublic])


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
        resetPassword
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.any
}
