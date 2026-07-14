import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import router from "./routers";

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
