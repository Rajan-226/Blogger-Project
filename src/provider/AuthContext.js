import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    
    const [currentUser, setCurrentUser] = useState();
    
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
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
    
    function updateName(name) {
        return currentUser.updateProfile({
            displayName: name
        }).then(() => {
            console.log('Success');
        })
    }
    
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateName,
    };
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        
        return unsubscribe;
    }, []);
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
