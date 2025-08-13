import React, { useState, Suspense } from "react";
import UseAuth from "../Hooks/UseAuth";
import ManageMyItemsList from "./ManageMyItemsList";
import { itemsCreatedByPromise } from "../api/itemsApi";

const ManageMyItems = () => {
  const { user } = UseAuth();
  const [refreshKey, setRefreshKey] = useState(0); // used to trigger refetch

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage My Items</h2>
      <Suspense fallback={<p>Loading your items...</p>}>
        <ManageMyItemsList
          itemsCreatedByPromise={itemsCreatedByPromise(user.email, refreshKey)}
          onRefresh={handleRefresh}
        />
      </Suspense>
    </div>
  );
};

export default ManageMyItems;
