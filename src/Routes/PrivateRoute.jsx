import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user} = use(AuthContext);

    if(!user){
        <Navigate to="/logIn"></Navigate>
    }
    return children;
};

export default PrivateRoute;