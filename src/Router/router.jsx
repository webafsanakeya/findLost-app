import { createBrowserRouter } from "react-router";
import RootLayOut from "../LayOuts/RootLayOut";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import LogIn from "../Pages/LogIn/LogIn";
import ItemDetails from "../Pages/ItemDetails/ItemDetails";
import PrivateRoute from "../Routes/PrivateRoute";
import MyRecoveries from "../AllRecovered/MyRecoveries";
import AddLostFoundItem from "../AddLostFoundItem/AddLostFoundItem";
import ManageMyItems from "../ManageMyItems/ManageMyItems";
import ViewItems from "../ViewItems/ViewItems";
import AllItems from "../Pages/AllItems/AllItems";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Faq from "../Pages/Faq/Faq";
import ManageMyItemsWithModal from "../Pages/ManageMyItemsWithModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayOut />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/items/:id",
        element: (
          <PrivateRoute>
            <ItemDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://find-lost-server-plum.vercel.app/items/${params.id}`),
      },
      {
        path: "/allRecovered",
        element: (
          <PrivateRoute>
            <MyRecoveries />
          </PrivateRoute>
        ),
      },
      {
        path: "/addItems",
        element: (
          <PrivateRoute>
            <AddLostFoundItem />
          </PrivateRoute>
        ),
      },
      { path: "/allItems", element: <AllItems /> },
      {
        path: "/myItems",
        element: (
          <PrivateRoute>
            <ManageMyItems />
          </PrivateRoute>
        ),
      },
      {
        path: "/myItemsModal",
        element:(
          <PrivateRoute>
            <ManageMyItemsWithModal />
          </PrivateRoute>
        )
      },
      {
        path: "/recoveries/:item_id",
        element: (
          <PrivateRoute>
            <ViewItems />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://find-lost-server-plum.vercel.app/recoveries/item/${params.item_id}`
          ),
      },
      { path: "/register", element: <Register /> },
      { path: "/logIn", element: <LogIn /> },
      { path: "/faq", element: <Faq /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
