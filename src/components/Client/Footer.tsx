import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { resources, company } from "../../constants";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };
  return (
    <div>
      <div className="overflow-hidden">
        <div className="flex max-sm:flex-col justify-between bg-black px-20 py-6">
          <div>
            <div
              className="text-white flex items-center gap-2 text-lg uppercase font-bold cursor-pointer"
              onClick={() => handleNavigate("/")}
            >
              NTS Booking
            </div>
            <div className="flex gap-3 mt-2">
              <div className="p-2 bg-[#818ced] rounded-full cursor-pointer hover:bg-[#818181]">
                <FaInstagram color="white" />
              </div>
              <div className="p-2 bg-[#818ced] rounded-full cursor-pointer hover:bg-[#818181]">
                <FaFacebookF color="white" />
              </div>
              <div className="p-2 bg-[#818ced] rounded-full cursor-pointer hover:bg-[#818181]">
                <FaTiktok color="white" />
              </div>
            </div>
          </div>
          <div>
            <ul className="space-y-4 max-sm:space-y-1 max-sm:mt-4">
              <li className="text-base text-white font-bold hover:text-gray-300">
                Resources
              </li>
              {resources.map((item) => (
                <li
                  key={item.label}
                  className="text-base text-white font-normal cursor-pointer max-sm:text-sm hover:text-gray-300"
                >
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-4 max-sm:space-y-1 max-sm:mt-4">
              <li className="text-base text-white font-bold">Company</li>
              {company.map((item) => (
                <li
                  key={item.label}
                  className="text-base text-white font-normal cursor-pointer max-sm:text-sm hover:text-gray-300"
                >
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-l-2 h-[full]"></div>
          <div>
            <ul className="space-y-4 max-sm:space-y-1 max-sm:mt-4">
              <li className="text-base text-white font-bold">Account Login</li>
              <li
                className="text-base text-white font-normal cursor-pointer max-sm:text-sm hover:text-gray-300 uppercase"
                onClick={() => handleNavigate("/login")}
              >
                Sign in
              </li>
              <li
                className="text-base text-white font-normal cursor-pointer max-sm:text-sm hover:text-gray-300 uppercase"
                onClick={() => handleNavigate("/signup")}
              >
                Sign Up
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-black px-10 py-5">
          <p className="text-xs text-white font-medium max-sm:text-[10px] max-sm:text-center">
            Powered by Sri Lankan railway department.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
