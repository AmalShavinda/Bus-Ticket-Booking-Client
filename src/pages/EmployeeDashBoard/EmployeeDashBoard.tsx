import { useState } from "react";
import Bookings from "../../components/Employee/Bookings";
import SideBar from "../../components/Employee/SideBar";

const EmployeeDashBoard = () => {
  const [selectedPage, setSelectedPage] = useState("bookings");

  const renderContent = () => {
    switch (selectedPage) {
      case "bookings":
        return <Bookings />;
      
    }
  };
  return (
    <div className="flex h-screen">
      <div className="h-[100vh]">
        <SideBar setSelectedPage={setSelectedPage} />
      </div>
      <div className="ml-[260px] flex-1 p-6 bg-gray-100">{renderContent()}</div>
    </div>
  )
}

export default EmployeeDashBoard
