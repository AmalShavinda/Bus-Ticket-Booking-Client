import React from "react";

interface SideBarProps {
  setSelectedPage: any;
}

const SideBar: React.FC<SideBarProps> = ({ setSelectedPage }) => {
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
        onClick={() => setSelectedPage("employees")}
        className="p-4 text-left hover:bg-gray-700 focus:outline-none"
      >
        Train History
      </button>
      <button
        onClick={() => setSelectedPage("trainRoutes")}
        className="p-4 text-left hover:bg-gray-700 focus:outline-none"
      >
        Train Routes
      </button>
      <button
        onClick={() => setSelectedPage("engine")}
        className="p-4 text-left hover:bg-gray-700 focus:outline-none"
      >
        Engines
      </button>
    </div>
  );
};

export default SideBar;
