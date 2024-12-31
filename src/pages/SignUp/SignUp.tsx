import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../redux/Auth/AuthAction";
import { RootState } from "../../redux/store";
import LoginBackgroundImg from "../../assets/login_background.jpg";

const SignUp = () => {
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    username: "",
    email: "",
    password: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(signup(userDetails) as any);
    navigate("/login");
    setUserDetails({
      firstname: "",
      username: "",
      email: "",
      password: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            Welcome to the NTC Booking Portal. Sign in to <br /> access your
            account.
          </p>
        </div>
        {error && (
          <div className="text-red-500 text-sm max-sm:text-xs">{error}</div>
        )}
        <form
          onSubmit={handleSignUp}
          className="space-y-6 w-[60%] mt-4 max-sm:w-full"
        >
          <div className="mt-1">
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Name"
              value={userDetails.firstname}
              onChange={handleChange}
              required
              className="appearance-none block w-full px-3 py-2 border bg-placeholderColor border-gray-300 rounded-md shadow-sm  focus:outline-none max-sm:text-xs"
            />
          </div>
          <div className="mt-1">
            <input
              id="username"
              name="username"
              type="username"
              placeholder="User name"
              value={userDetails.username}
              onChange={handleChange}
              required
              className="appearance-none block w-full px-3 py-2 border bg-placeholderColor border-gray-300 rounded-md shadow-sm  focus:outline-none max-sm:text-xs"
            />
          </div>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={handleChange}
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
              value={userDetails.password}
              onChange={handleChange}
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
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between mt-2 w-[60%] max-sm:w-full">
          <div className="text-sm max-sm:text-xs">
            <a href="#" className="font-medium text-[#545454]">
              Forgot your password?
            </a>
          </div>
          <div className="text-sm max-sm:text-xs">
            <a href="#" className="font-medium text-[#545454]">
              Already have an account?{" "}
              <span
                className="text-blue-400"
                onClick={() => navigate("/login")}
              >
                Click Here
              </span>
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

export default SignUp;
