import { createBrowserRouter } from "react-router";
import RootLayOut from "../LayOuts/RootLayOut";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import LogIn from "../Pages/LogIn/LogIn";
import AllItems from "../Pages/AllItems/AllItems";
import ItemDetails from "../Pages/ItemDetails/ItemDetails";
import PrivateRoute from "../Routes/PrivateRoute";
import MyRecoveries from "../AllRecovered/MyRecoveries";

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
          path: '/myItems',
          element: <PrivateRoute><MyRecoveries></MyRecoveries></PrivateRoute>
        },
        {
          path: '/allItems',
          Component: AllItems

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
