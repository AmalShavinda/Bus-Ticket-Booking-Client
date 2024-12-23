import { useEffect, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { EmployeesActionTypes } from "../../redux/Employees/EmployeesReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../../redux/Employees/EmployeesAction";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import NoDataFoundImg from "../../assets/no-data-found.png";
import { fetchAlledBuses } from "../../redux/Buses/BusesAction";

type AppDispatch = ThunkDispatch<RootState, unknown, EmployeesActionTypes>;

const Employees = () => {
  const dispatch: AppDispatch = useDispatch();
  const { employees, loading } = useSelector(
    (state: RootState) => state.employees
  );

  const { buses } = useSelector((state: RootState) => state.buses);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingEmployeeId, setEditingEmployeeId] = useState<string | null>(
    null
  );
  const [password, setPassword] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    username: "",
    employeeName: "",
    employeePosition: "",
    employeeMobile: "",
    assignedBus: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchAlledBuses());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPassword(value); // Handle password separately
    } else {
      setNewEmployee((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const employeeData: {
      username: string;
      employeeName: string;
      employeePosition: string;
      employeeMobile: string;
      assignedBus: string;
      password?: string; // Optional password
    } = { ...newEmployee };

    if (!editingEmployeeId && password) {
      employeeData.password = password; // Add password only for new employee
    }
    if (editingEmployeeId) {
      // Update employee
      await dispatch(updateEmployee(editingEmployeeId, newEmployee));
    } else {
      // Add new employee
      await dispatch(createEmployee(employeeData));
    }
    await dispatch(fetchEmployees());
    handleCloseModal();
  };

  const handleOpenModal = (employee: any = null) => {
    if (employee) {
      setEditingEmployeeId(employee._id); // Use appropriate ID field
      setNewEmployee({
        username: employee.username,
        employeeName: employee.employeeName,
        employeePosition: employee.employeePosition,
        employeeMobile: employee.employeeMobile,
        assignedBus: employee.assignedBus,
      });
    } else {
      setEditingEmployeeId(null);
      setNewEmployee({
        username: "",
        employeeName: "",
        employeePosition: "",
        employeeMobile: "",
        assignedBus: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployeeId(null);
    setNewEmployee({
      username: "",
      employeeName: "",
      employeePosition: "",
      employeeMobile: "",
      assignedBus: "",
    });
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (isConfirmed) {
      await dispatch(deleteEmployee(id));
    }
    dispatch(fetchEmployees());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employees</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleOpenModal()}
        >
          New Employee
        </button>
      </div>

      <div className="mt-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form
            className="w-full relative"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="overflow-y-auto h-[460px] border">
              <table className="min-w-full bg-white">
                <thead className="bg-[#F5F5F5]">
                  <tr className="text-xs text-[#888888] font-semibold">
                    <th className="py-3 px-4 text-left">User Name</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left pr-12">Position</th>
                    <th className="py-3 px-4 text-left pr-12">Mobile</th>
                    <th className="py-3 px-4 text-left pr-12">Assigned Bus</th>
                    <th className="py-3 px-4 text-left pr-12">Actions</th>
                  </tr>
                </thead>
                {employees.length > 0 ? (
                  <tbody>
                    {employees.map((item: any, index: any) => (
                      <tr
                        key={index}
                        className="text-sm text-[#323232] font-medium cursor-default"
                      >
                        <td className="py-2 px-4 flex items-center gap-4">
                          <div className="text-[15px] font-medium">
                            {item.username}
                          </div>
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.employeeName}
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.employeePosition}
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.employeeMobile}
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.assignedBus.registrationNumber}
                        </td>
                        <td className="py-2 px-4 text-left">
                          <div className="flex items-center gap-5">
                            <FaRegEdit
                              size={20}
                              onClick={() => handleOpenModal(item)}
                              className="cursor-pointer text-blue-500 hover:text-blue-600"
                            />
                            <RiDeleteBin6Line
                              size={20}
                              onClick={() => handleDelete(item._id)}
                              className="cursor-pointer text-red-500 hover:text-red-600"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td
                        colSpan={5}
                        className="py-6 text-center text-sm text-[#6b6b6b] h-80 relative"
                      >
                        <div className="absolute top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <img src={NoDataFoundImg} alt="" className="w-80" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </form>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-12 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingEmployeeId ? "Update Employee" : "Add New Employee"}
            </h2>
            <form onSubmit={handleEmployeeSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={newEmployee.username}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="employeeName"
                  value={newEmployee.employeeName}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Position
                </label>
                <select
                  name="employeePosition"
                  value={newEmployee.employeePosition}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>
                    Select the position
                  </option>
                  <option value="Driver">Driver</option>
                  <option value="Conductor">Conductor</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Mobile
                </label>
                <input
                  type="text"
                  name="employeeMobile"
                  value={newEmployee.employeeMobile}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Mobile Number"
                  required={!editingEmployeeId}
                  disabled={!!editingEmployeeId} // Password required only for new employees
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Assigned Bus
                </label>
                <select
                  name="assignedBus"
                  value={newEmployee.assignedBus}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>
                    Select the bus
                  </option>
                  {buses.map((bus, index) => (
                    <option key={index} value={bus._id}>
                      {bus.registrationNumber}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Password"
                  required={!editingEmployeeId}
                  disabled={!!editingEmployeeId} // Password required only for new employees
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {editingEmployeeId ? "Update Employee" : "Add Employee"}
                </button>
              </div>
              {/* {error && <span>{emplo}</span>} */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
