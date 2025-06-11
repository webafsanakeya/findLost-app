import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../../Firebase/firebase.init';

const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOutUser = () =>{
        setLoading(true);
        return signOut(auth)
        
    }

    useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
            console.log('user in the auth state changed', currentUser);

        })
        return () =>{
            unSubscribe();
        }
    }, [])

    const authInfo = {
        loading,
        user,
        createUser,
        logInUser,
        logOutUser
    }
    return (
       <AuthContext value={authInfo}>
        {children}

       </AuthContext>
    );
};

export default AuthProvider;