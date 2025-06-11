import { createBrowserRouter } from "react-router";
import RootLayOut from "../LayOuts/RootLayOut";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import LogIn from "../Pages/LogIn/LogIn";

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
