import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Mainlayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 p-5 pt-5 ">
        <Outlet  />
      </div>
      <Footer />
    </div>
  );
}

export default Mainlayout;
