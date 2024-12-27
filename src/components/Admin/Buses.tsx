import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { BusesActionTypes } from "../../redux/Buses/BusesReducer";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import {
  addBuses,
  deleteBuses,
  fetchAlledBuses,
  updateBuses,
} from "../../redux/Buses/BusesAction";
import NoDataFoundImg from "../../assets/no-data-found.png";
import {
  fetchConductors,
  fetchDrivers,
} from "../../redux/Employees/EmployeesAction";

type AppDispatch = ThunkDispatch<RootState, unknown, BusesActionTypes>;

const Buses = () => {
  const dispatch: AppDispatch = useDispatch();
  const { buses, loading } = useSelector((state: RootState) => state.buses);
  const { drivers } = useSelector((state: RootState) => state.employees);
  const { conductors } = useSelector((state: RootState) => state.employees);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingBusId, setEditingBusId] = useState<string | null>(null);
  const [newBus, setNewBus] = useState({
    registrationNumber: "",
    model: "",
    seatCapacity: 0,
    driver: "",
    conductor: "",
    owner: "",
  });

  useEffect(() => {
    dispatch(fetchAlledBuses());
    dispatch(fetchDrivers());
    dispatch(fetchConductors());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewBus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBusId) {
      // Update bus
      await dispatch(updateBuses(editingBusId, newBus));
    } else {
      // Add new bus
      await dispatch(addBuses(newBus));
    }
    await dispatch(fetchAlledBuses());
    handleCloseModal();
  };

  const handleOpenModal = (bus: any = null) => {
    if (bus) {
      setEditingBusId(bus._id); // Use appropriate ID field
      setNewBus({
        registrationNumber: bus.registrationNumber,
        model: bus.model,
        seatCapacity: bus.seatCapacity,
        driver: bus.driver?._id,
        conductor: bus.conductor?._id,
        owner: bus.owner,
      });
    } else {
      setEditingBusId(null);
      setNewBus({
        registrationNumber: "",
        model: "",
        seatCapacity: 0,
        driver: "",
        conductor: "",
        owner: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBusId(null);
    setNewBus({
      registrationNumber: "",
      model: "",
      seatCapacity: 0,
      driver: "",
      conductor: "",
      owner: "",
    });
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this bus?"
    );
    if (isConfirmed) {
      await dispatch(deleteBuses(id));
    }
    dispatch(fetchAlledBuses());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Buses</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleOpenModal()}
        >
          New Bus
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
                    <th className="py-3 px-4 text-left">Bus Number</th>
                    <th className="py-3 px-4 text-left pr-12">Model</th>
                    <th className="py-3 px-4 text-left pr-12">Seat Capacity</th>
                    <th className="py-3 px-4 text-left pr-12">Driver</th>
                    <th className="py-3 px-4 text-left pr-12">Conductors</th>
                    <th className="py-3 px-4 text-left pr-12">Owned</th>
                    <th className="py-3 px-4 text-left pr-12">Actions</th>
                  </tr>
                </thead>
                {buses.length > 0 ? (
                  <tbody>
                    {buses.map((item: any, index: any) => (
                      <tr
                        key={index}
                        className="text-sm text-[#323232] font-medium cursor-default"
                      >
                        <td className="py-2 px-4 flex items-center gap-4">
                          <div className="text-[15px] font-medium">
                            {item.registrationNumber}
                          </div>
                        </td>
                        <td className="py-2 px-4 text-left">{item.model}</td>
                        <td className="py-2 px-4 text-left">
                          {item.seatCapacity}
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.driver?.employeeName}
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.conductor?.employeeName}
                        </td>
                        <td className="py-2 px-4 text-left">{item.owner}</td>
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
              {editingBusId ? "Update Employee" : "Add New Employee"}
            </h2>
            <form onSubmit={handleEmployeeSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Bus Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={newBus.registrationNumber}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Bus Number"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Model
                </label>
                <input
                  type="text"
                  name="model"
                  value={newBus.model}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Model"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Seat Capacity
                </label>
                <input
                  type="text"
                  name="seatCapacity"
                  value={newBus.seatCapacity}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Seat Capacity"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Driver
                </label>
                <select
                  name="driver"
                  value={newBus.driver}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>
                    Select the Driver
                  </option>
                  {drivers.map((driver, index) => (
                    <option key={index} value={driver._id}>
                      {driver.employeeName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Conductor
                </label>
                <select
                  name="conductor"
                  value={newBus.conductor}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>
                    Select the Conductor
                  </option>
                  {conductors.map((conductor, index) => (
                    <option key={index} value={conductor._id}>
                      {conductor.employeeName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Owner
                </label>
                <select
                  name="owner"
                  value={newBus.owner}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>
                    Select the Conductor
                  </option>
                  <option value="NTS">NTS</option>
                </select>
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
                  {editingBusId ? "Update Bus" : "Add Bus"}
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

export default Buses;
