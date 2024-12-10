import { useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { EmployeesActionTypes } from "../../redux/Employees/EmployeesReducer";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../redux/Employees/EmployeesAction";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

type AppDispatch = ThunkDispatch<RootState, unknown, EmployeesActionTypes>;

const  Employees = () => {
  const dispatch: AppDispatch = useDispatch();
  const { employees } = useSelector((state: RootState) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employees</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          New Employee
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Employee ID</th>
            <th className="py-2 px-4 border">User Name</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Position</th>
            <th className="py-2 px-4 border">Mobile</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.employeeId}</td>
              <td className="border px-4 py-2">{item.username}</td>
              <td className="border px-4 py-2">{item.employeeName}</td>
              <td className="border px-4 py-2">{item.employeePosition}</td>
              <td className="border px-4 py-2">{item.employeeMobile}</td>
              <td className="border px-4 py-2 flex gap-5">
                <RiDeleteBin6Line
                  size={20}
                  //   onClick={() => handleDelete(user._id)}
                  className="cursor-pointer text-red-500 hover:text-red-600"
                />
                <FaRegEdit
                  size={20}
                  //   onClick={() => handleEditUser(user)}
                  className="cursor-pointer text-blue-500 hover:text-blue-600"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="mt-4">
            {loading ? (
              <SkeletonLoader />
            ) : (
              <form
                className="w-full relative"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="overflow-y-auto h-[460px] border">
                  <table className="min-w-full bg-white">
                    <thead className="bg-[#F5F5F5]">
                      <tr className="text-xs text-[#888888] font-semibold">
                        <th className="py-3 px-4 text-left">Employee</th>
                        <th className="py-3 px-4 text-left">EPF No</th>
                        <th className="py-3 px-4 text-left pr-12">Date</th>
                        <th className="py-3 px-4 text-left pr-12">Days</th>
                        <th className="py-3 px-4 text-left pr-12">
                          Applied On
                        </th>
                        <th className="py-3 px-4 text-left pr-12">
                          Leave Type
                        </th>
                        <th className="py-3 px-4 text-left pr-12">Status</th>
                        <th className="py-3 px-4 text-left pr-12"></th>
                      </tr>
                    </thead>
                    {filteredLeaves.length > 0 ? (
                      <tbody>
                        {filteredLeaves.map((item: any, index: any) => (
                          <tr
                            key={index}
                            className="text-sm text-[#323232] font-medium cursor-default"
                            onClick={() => onRowClick(item)}
                          >
                            <td className="py-2 px-4 flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full">
                                <img
                                  src={
                                    item.imagePath === null ||
                                    item.imagePath === ""
                                      ? ProfileImg
                                      : item.imagePath
                                  }
                                  alt=""
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              </div>
                              <div className="text-[15px] font-medium">
                                {item.employeeName}
                              </div>
                            </td>
                            <td className="py-2 px-4 text-left">
                              {item.epfNo ? item.epfNo : "--:--"}
                            </td>
                            <td className="py-2 px-4 text-left">
                              {item.startDate && item.endDate
                                ? item.startDate + " to " + item.endDate
                                : item.startDate === item.endDate
                                ? item.startDate
                                : "--:--"}
                            </td>
                            <td className="py-2 px-4 text-left">
                              {item.daysCount ? item.daysCount : "--:--"}
                            </td>
                            <td className="py-2 px-4 text-left">
                              {item.appliedOn ? item.appliedOn : "--:--"}
                            </td>
                            <td className="py-2 px-4">
                              {item.leaveType ? item.leaveType : "--:--"}
                            </td>
                            <td className="py-2 px-4">
                              {item.status !== null && item.status !== undefined
                                ? item.status === 0
                                  ? "Pending"
                                  : item.status === 1
                                  ? "Approved"
                                  : item.status === 2
                                  ? "Rejected"
                                  : "Cancel"
                                : "--:--"}
                            </td>
                            <td className="py-2 px-4">
                              <div
                                className="flex items-center justify-center p-2 w-8 border border-[#D9D9D9] rounded-full cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenModal(item);
                                }}
                              >
                                {selectedLeave === item && isModalOpen ? (
                                  <IoCloseOutline color="#9C9C9C" />
                                ) : (
                                  <PiDotsThreeVerticalBold color="#9C9C9C" />
                                )}
                              </div>
                              {selectedLeave === item && isModalOpen && (
                                <div className="absolute mt-[-30px] right-20 bg-white border-[4px] border-[#FBF8F8] py-2 rounded-md shadow-md w-40 z-10">
                                  <div className="flex-col gap-2">
                                    <div>
                                      <button
                                        className="text-xs text-[#323232] text-start py-1 px-3 rounded w-full hover:bg-[#E1FFB7]"
                                        onClick={(event) => {
                                          // Approve action
                                          event.stopPropagation();
                                          handleLeaveAction(
                                            item.leaveRequestId,
                                            1
                                          );
                                        }}
                                      >
                                        Approve
                                      </button>
                                    </div>
                                    <div>
                                      <button
                                        className="text-xs text-[#323232] text-start py-1 px-3 rounded w-full hover:bg-[#E1FFB7]"
                                        onClick={(event) => {
                                          // Reject action
                                          event.stopPropagation();
                                          handleLeaveAction(
                                            item.leaveRequestId,
                                            2
                                          );
                                        }}
                                      >
                                        Reject
                                      </button>
                                    </div>
                                    <div>
                                      <button
                                        className="text-xs text-[#323232] text-start py-1 px-3 rounded w-full hover:bg-[#E1FFB7]"
                                        onClick={(event) => {
                                          // Reject action
                                          event.stopPropagation();
                                          handleLeaveAction(
                                            item.leaveRequestId,
                                            3
                                          );
                                        }}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td
                            colSpan={8}
                            className="py-6 text-center text-sm text-[#6b6b6b] h-80 relative"
                          >
                            <div className="absolute top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <img
                                src={NoDataFoundImg}
                                alt=""
                                className="w-80"
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
              </form>
            )}
          </div> */}

      {/* {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-12 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingUserId ? "Update User" : "Add New User"}
            </h2>
            <form onSubmit={handleUserSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={newUser.firstname}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required={!editingUserId}
                  disabled={editingUserId} // Password required only for new users
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Role
                </label>
                <select
                  name="isAdmin"
                  value={newUser.isAdmin ? "true" : "false"}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="false">User</option>
                  <option value="true">Admin</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {editingUserId ? "Update User" : "Add User"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
              {error && <span>{error.message}</span>}
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Employees;
