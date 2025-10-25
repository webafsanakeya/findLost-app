import React, { Suspense } from "react";
import UseAuth from "../Hooks/UseAuth";
import { myRecoveriesPromise } from "../api/recoveries";
import RecoveriesList from "./RecoveriesList";
import ErrorBoundary from "../Pages/Shared/ErrorBoundary";


const MyRecoveries = () => {
  const { user } = UseAuth();

  if (!user) {
    return (
      <p className="text-center mt-20 text-red-500">
        Please log in to view your recoveries.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <ErrorBoundary>
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
              <p className="mt-4 text-gray-700 dark:text-gray-200">
                Loading your recoveries...
              </p>
            </div>
          }
        >
          <RecoveriesList myRecoveriesPromise={myRecoveriesPromise(user.email)} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default MyRecoveries;
