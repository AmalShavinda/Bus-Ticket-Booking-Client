import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { UsersActionTypes } from "../../redux/Users/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import NoDataFoundImg from "../../assets/no-data-found.png";
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/Users/UsersAction";

type AppDispatch = ThunkDispatch<RootState, unknown, UsersActionTypes>;

const Users = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading } = useSelector((state: RootState) => state.users);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    firstname: "",
    email: "",
    isAdmin: "",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPassword(value); // Handle password separately
    } else {
      setNewUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData: {
      username: string;
      firstname: string;
      email: string;
      isAdmin: string;
      password?: string; // Optional password
    } = { ...newUser };

    if (!editingUserId && password) {
      userData.password = password; // Add password only for new employee
    }
    if (editingUserId) {
      // Update employee
      await dispatch(updateUser(editingUserId, newUser));
    } else {
      // Add new employee
      await dispatch(createUser(userData));
    }
    await dispatch(fetchUsers());
    handleCloseModal();
  };

  const handleOpenModal = (user: any = null) => {
    if (user) {
      setEditingUserId(user._id); // Use appropriate ID field
      setNewUser({
        username: user.username,
        firstname: user.firstname,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      setEditingUserId(null);
      setNewUser({
        username: "",
        firstname: "",
        email: "",
        isAdmin: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUserId(null);
    setNewUser({
      username: "",
      firstname: "",
      email: "",
      isAdmin: "",
    });
    setPassword("");
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      await dispatch(deleteUser(id));
    }
    dispatch(fetchUsers());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleOpenModal()}
        >
          New User
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
                    <th className="py-3 px-4 text-left pr-12">Email</th>
                    <th className="py-3 px-4 text-left pr-12">Role</th>
                    <th className="py-3 px-4 text-left pr-12">Actions</th>
                  </tr>
                </thead>
                {users.length > 0 ? (
                  <tbody>
                    {users.map((item: any, index: any) => (
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
                          {item.firstname}
                        </td>
                        <td className="py-2 px-4 text-left">{item.email}</td>
                        <td className="py-2 px-4 text-left">
                          {item.isAdmin ? "Admin" : "Client"}
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
              {editingUserId ? "Update User" : "Add New User"}
            </h2>
            <form onSubmit={handleEmployeeSubmit}>
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
                  name="firstname"
                  value={newUser.firstname}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Role
                </label>
                <select
                  name="isAdmin"
                  value={newUser.isAdmin}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>
                    Select the role
                  </option>
                  <option value={"true"}>Admin</option>
                  <option value="false">Client</option>
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
                  required={!editingUserId}
                  disabled={!!editingUserId}
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
                  {editingUserId ? "Update User" : "Add User"}
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

export default Users;
