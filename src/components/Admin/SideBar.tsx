import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../redux/Auth/AuthAction";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
  setSelectedPage: any;
}

const SideBar: React.FC<SideBarProps> = ({ setSelectedPage }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-[100vh] fixed">
      <div className="p-4 text-xl font-bold">Admin Dashboard</div>
      <button
        onClick={() => setSelectedPage("users")}
        className="p-4 text-left hover:bg-gray-700 focus:outline-none"
      >
        Users
      </button>
      <button
        onClick={() => setSelectedPage("employees")}
        className="p-4 text-left hover:bg-gray-700 focus:outline-none"
      >
        Employees
      </button>
      <button
        onClick={() => setSelectedPage("buses")}
        className="p-4 text-left hover:bg-gray-700 focus:outline-none"
      >
        Buses
      </button>
      <button
        onClick={() => setSelectedPage("bookings")}
        className="p-4 text-left hover:bg-gray-700 focus:outline-none"
      >
        Bookings
      </button>
      <button
        onClick={() => setSelectedPage("routes")}
        className="p-4 text-left hover:bg-gray-700 focus:outline-none"
      >
        Routes
      </button>
      <div className="space-y-4 px-4 absolute bottom-8">
        <div className=" flex items-center gap-3">
          <FaUserCircle color="white" size={22} />
          <p className="text-base text-white leading-normal uppercase">
            {user.firstname}
          </p>
        </div>
        <FiLogOut
          color="white"
          size={22}
          onClick={handleLogOut}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SideBar;
