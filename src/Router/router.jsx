import { createBrowserRouter } from "react-router";
import RootLayOut from "../LayOuts/RootLayOut";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
        {
            index: true,
            Component: Home
        }
    ]
  },
]);

export default router;
