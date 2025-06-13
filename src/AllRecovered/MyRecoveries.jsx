import React, { Suspense } from 'react';

import UseAuth from '../Hooks/UseAuth';
import { myRecoveriesPromise } from '../api/recoveries';
import RecoveriesList from './RecoveriesList';
import RecoveredStats from './RecoveredStats';


const MyRecoveries = () => {

    const {user} = UseAuth();
    return (
        <div>
            <RecoveredStats></RecoveredStats>
            <Suspense fallback={'loading your recoveries'}>
               <RecoveriesList myRecoveriesPromise={myRecoveriesPromise(user.email)}></RecoveriesList>
            </Suspense>
        </div>
    );
};

export default MyRecoveries;