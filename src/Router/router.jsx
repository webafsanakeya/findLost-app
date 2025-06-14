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

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: '/items/:id',
          element: <PrivateRoute><ItemDetails></ItemDetails></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:3000/items/${params.id}`)

        },
        {
          path: '/allRecovered',
          element: <PrivateRoute><MyRecoveries></MyRecoveries></PrivateRoute>
        },
        {
          path: '/addItems',
          element: <PrivateRoute><AddLostFoundItem></AddLostFoundItem></PrivateRoute>

        },
        {
          path: '/myItems',
          element: <PrivateRoute><ManageMyItems></ManageMyItems></PrivateRoute>

        },
        {
          path: '/recoveries/:item_id',
          element: <PrivateRoute><ViewItems></ViewItems></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:3000/recoveries/item/${params.item_id}`)

        },
       
        {
          path: '/register',
          Component: Register
        },
        {
          path: '/logIn',
          Component: LogIn
        }
    ]
  },
]);

export default router;
