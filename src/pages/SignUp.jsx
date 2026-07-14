import {
  faCircleUser,
  faCode,
  faLock,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { register } from "../api/register";
import { loginSchema } from "../schemas/loginSchema";
import { useUserStore } from "../stores/userStore";

const defaustValue = {
  username: "",
  password: "",
  confirmPasswod: "",
};
function SignUp() {
  const [form, setForm] = useState(defaustValue);
  const token = useUserStore((store) => store.token);
  const navigate = useNavigate();

  const hdlOnChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };
  const hdlSubmit = async (evt) => {
    evt.preventDefault();
    const validate = loginSchema.safeParse(form);
    if (!validate.success) {
      const { username, password, confirmPasswod } =
        validate.error.flatten().fieldErrors;
      username && toast.error(username[0]);
      password && toast.error(password[0]);
      confirmPasswod && toast.error(confirmPasswod[0]);
    }

    try {
      await register({
        username: validate.data.username,
        password: validate.data.password,
      });
      navigate("/login");
      setForm(defaustValue);
      toast.success(`Register Successfully!Please Login to use`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (token) return <Navigate to={"/"} replace />;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-130 min-h-110 shadow-xl rounded-xl bg-white p-5 flex flex-col ">
        <div className="flex w-full flex-col items-center justify-center gap-3 ">
          <FontAwesomeIcon
            icon={faCode}
            className="p-2 text-2xl  rounded-lg bg-blue-200 text-cyan-600"
          />
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="text-sm text-gray-400">
            Please login to test Frontend system!
          </p>
          <form onSubmit={hdlSubmit} className="w-[70%] p-2 grid gap-5">
            <div className="relative w-full  text-gray-400 fucus:text-blue-500">
              <FontAwesomeIcon
                icon={faCircleUser}
                className="absolute top-[30%] left-1.5 "
              />
              <input
                onChange={hdlOnChange}
                value={form.username}
                type="text"
                name="username"
                className="w-full pl-9 py-2.5 border border-gray-300 rounded-xl outline-blue-300"
                placeholder="Username"
              />
            </div>
            <div className="relative w-full text-gray-400 fucus:text-blue-500">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute top-[30%] left-1.5 "
              />
              <input
                onChange={hdlOnChange}
                type="password"
                name="password"
                value={form.password}
                className="w-full pl-9 py-2.5 border border-gray-300 rounded-xl outline-blue-300"
                placeholder="Passwrod"
              />
            </div>
            <div className="relative w-full text-gray-400 fucus:text-blue-500">
              <FontAwesomeIcon
                icon={faShieldHalved}
                className="absolute top-[30%] left-1.5 "
              />
              <input
                onChange={hdlOnChange}
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                className="w-full pl-9 py-2.5 border border-gray-300 rounded-xl outline-blue-300"
                placeholder="ConfirmPassword"
              />
            </div>
            <button className="bg-blue-600/90 cursor-pointer focus:bg-blue-700 text-white py-2.5 rounded-xl font-semibold w-full active:scale-95 transition-all duration-150 ease-in-out ">
              Register
            </button>
          </form>
          <div className="flex items-center text-sm space-x-1">
            <p className=" text-gray-400">Already have an account?</p>
            <span
              className=" text-blue-400 cursor-pointer font-semibold"
              onClick={() => navigate("/login")}
            >
              Log In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
