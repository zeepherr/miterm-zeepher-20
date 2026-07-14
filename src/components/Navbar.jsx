import { useNavigate } from "react-router";
import "../index.css";
import { useUserStore } from "../stores/userStore";

function Navbar() {
  const navigate = useNavigate();
  const token = useUserStore((store) => store.token);
  const logOut = useUserStore((store) => store.logOut);
  const hdlClick = () => {
    logOut();
    navigate("/login");
  };
  return (
    <div className="bg-#FFFFFF shadow-2xl w-full flex justify-evenly p-3 ">
      <h1 className="profile text-2xl font-bold text-white/20 cursor-pointer" onClick={()=> navigate("/")}>Zeepher</h1>
      {token ? (
        <button
          onClick={hdlClick}
          className="py-1 px-2 rounded-xl cursor-pointer bg-blue-600/90 hover:bg-blue-600 hover:scale-105 transition-all active:bg-blue-600/10 text-white"
        >
          Logout
        </button>
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default Navbar;
