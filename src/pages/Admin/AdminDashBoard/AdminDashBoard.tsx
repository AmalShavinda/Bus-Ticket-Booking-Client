import { useState } from "react";
import SideBar from "../../../components/Admin/SideBar";
import Users from "../../../components/Admin/Users";
import Employees from "../../../components/Admin/Employees";
import Buses from "../../../components/Admin/Buses";
import Bookings from "../../../components/Admin/Bookings";
import Route from "../../../components/Admin/Route";
import Trips from "../../../components/Admin/Trips";

const AdminDashBoard = () => {
  const [selectedPage, setSelectedPage] = useState("users");

  const renderContent = () => {
    switch (selectedPage) {
      case "users":
        return <Users />;
      case "employees":
        return <Employees />;
      case "buses":
        return <Buses />;
      case "bookings":
        return <Bookings />;
      case "routes":
        return <Route />;
      case "trips":
        return <Trips />;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="h-[100vh]">
        <SideBar setSelectedPage={setSelectedPage} />
      </div>
      <div className="ml-[260px] flex-1 p-6 bg-gray-100">{renderContent()}</div>
    </div>
  );
};

export default AdminDashBoard;
