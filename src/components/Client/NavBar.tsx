import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../redux/Auth/AuthAction";
import { navLinks } from "../../constants";
import { RootState } from "../../redux/store";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Handle navigation
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // Handle logout
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header>
      <nav className="flex justify-between w-full px-10 py-4 items-center bg-black z-10">
        <div
          className="text-white flex items-center gap-2 text-lg uppercase font-bold cursor-pointer"
          onClick={() => handleNavigate("/")}
        >
          NTC Booking
        </div>

        {/* Navigation links */}
        <ul className="flex-1 flex justify-center items-center gap-16">
          {navLinks.map((item) => (
            <li key={item.label}>
              <div
                onClick={() => handleNavigate(item.href)}
                className="leading-normal text-base text-white cursor-pointer uppercase"
              >
                {item.label}
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          {isAuthenticated && user ? (
            <>
              <p className="text-base text-white leading-normal uppercase">
                {user.firstname}
              </p>
              <FaUserCircle color="white" size={22} />
              <FiLogOut
                color="white"
                size={22}
                onClick={handleLogOut}
                className="cursor-pointer"
              />
            </>
          ) : (
            <>
              <button
                className="px-10 py-2 bg-blue-500 text-white text-sm font-semibold uppercase"
                onClick={() => handleNavigate("/login")}
              >
                Sign In
              </button>
              <button
                className="text-white font-semibold uppercase text-sm px-10 py-2 border border-blue-500"
                onClick={() => handleNavigate("/signup")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
