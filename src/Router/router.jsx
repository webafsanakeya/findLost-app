import { createBrowserRouter } from "react-router";
import RootLayOut from "../LayOuts/RootLayOut";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import LogIn from "../Pages/LogIn/LogIn";
import ViewDetails from "../Pages/ViewDetails/ViewDetails";
import AllItems from "../Pages/AllItems/AllItems";

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
          Component: ViewDetails,
          loader: ({params}) => fetch(`http://localhost:3000/items/${params.id}`)

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
