import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';

const AuthContext = React.createContext();
var userName;

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    async function signup(email, password, name) {

        userName = name;

        const response = await auth.createUserWithEmailAndPassword(email, password);

        return response;
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function logout() {
        return auth.signOut();
    }


    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {

            if (user && !user.displayName) {
                await user.updateProfile({
                    displayName: userName
                }).then(() => {
                    console.log("Name Added");
                })
            }

            setCurrentUser(user);
            setLoading(false);

            console.log("User = ", user);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
