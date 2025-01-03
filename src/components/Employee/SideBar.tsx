import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/Auth/AuthAction";
import React from "react";

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
      <div className="p-4 text-xl font-bold">Employee Dashboard</div>
      <button
        onClick={() => setSelectedPage("bookings")}
        className="p-4 text-left hover:bg-gray-700 focus:outline-none"
      >
        Bookings
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
