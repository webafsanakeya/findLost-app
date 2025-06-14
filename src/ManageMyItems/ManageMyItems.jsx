import React, { Suspense } from 'react';
import UseAuth from '../Hooks/UseAuth';
import ManageMyItemsList from './ManageMyItemsList';
import { itemsCreatedByPromise } from '../api/itemsApi';

const ManageMyItems = () => {

    const {user} = UseAuth();
    return (
        <div>
           <h2>Manage My Items: </h2> 
           <Suspense>
            <ManageMyItemsList itemsCreatedByPromise={itemsCreatedByPromise(user.email)}></ManageMyItemsList>
           </Suspense>
        </div>
    );
};

export default ManageMyItems;