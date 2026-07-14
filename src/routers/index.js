import { createBrowserRouter } from "react-router";
import NotFound from "../components/NotFound";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../pages/Home";
import Login from "../pages/Login";

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
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;
