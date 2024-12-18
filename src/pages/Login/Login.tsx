import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/Auth/AuthAction"; // Adjust import path
import store, { RootState } from "../../redux/store"; // Adjust based on your store setup
import { useNavigate } from "react-router-dom";

import LoginBackgroundImg from "../../assets/login_background.jpg";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dispatch the login action and wait for it to complete
    await dispatch(login({ username, password }) as any); // Ensure `login` updates the Redux state

    // Retrieve user role from Redux state
    const { user } = (store.getState() as RootState).auth;

    if (user?.isAdmin) {
      navigate("/admin");
    } else if (user?.role === "employee") {
      navigate("/employee");
    } else {
      navigate("/");
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center text-center justify-center md:w-[50%] h-[90vh] md:h-[90vh] max-sm:px-10 max-md:w-full">
        <p className="text-3xl text-[#323232] font-bold">NTC Booking</p>
        <div className="items-center mt-4">
          <p className="text-sm text-[#494B49] font-semibold max-sm:text-xs sm:text-xs">
            Welcome to the NTS Booking Portal. Sign in to <br /> access your
            account.
          </p>
        </div>
        {error && (
          <div className="text-red-500 text-sm max-sm:text-xs">{error}</div>
        )}
        <form
          onSubmit={handleLogin}
          className="space-y-6 w-[60%] mt-4 max-sm:w-full"
        >
          <div className="mt-1">
            <input
              id="username"
              name="username"
              type="username"
              placeholder="User name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="appearance-none block w-full px-3 py-2 border bg-placeholderColor border-gray-300 rounded-md shadow-sm  focus:outline-none max-sm:text-xs"
            />
          </div>
          <div className="mt-2 relative">
            <input
              id="password"
              name="password"
              type={isVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="appearance-none block w-full px-3 py-2 border bg-placeholderColor border-gray-300 rounded-md shadow-sm  focus:outline-none max-sm:text-xs"
            />
            <div
              className=" absolute right-4 bottom-3 max-sm:bottom-[9px]"
              onClick={toggleVisibility}
              style={{ cursor: "pointer" }}
            >
              {isVisible ? (
                <FaRegEye color="#737373" />
              ) : (
                <FaRegEyeSlash color="#737373" />
              )}
            </div>
          </div>
          <div className="mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-[#F30E0A] shadow-sm text-sm font-bold text-white bg-secondaryColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 max-sm:text-xs"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between mt-2 w-[60%] max-sm:w-full">
          <div className="text-sm max-sm:text-xs">
            <a href="#" className="font-medium text-[#545454]">
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 justify-center mt-6 w-[60%] max-sm:w-full">
          <p className=" text-center text-xs text-[#B6B7B5]">
            Copyright © 2024. All rights reserved. terms & privacy policy.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-[50%] mt-3 max-md:hidden">
        <div className="w-[80%]">
          <img
            src={LoginBackgroundImg}
            alt=""
            className="md:h-[550px] lg:h-[650px] object-center object-contain relative"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
