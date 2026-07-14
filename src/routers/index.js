import { createBrowserRouter } from "react-router";
import NotFound from "../components/NotFound";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Mainlayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path:"/register",
        Component: SignUp
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;
