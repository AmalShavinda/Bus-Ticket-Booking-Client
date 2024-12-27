import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { TripsActionTypes } from "../../redux/Trips/TripsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  clearTrips,
  createTrip,
  deleteTrip,
  fetchTripsByDate,
} from "../../redux/Trips/TripsAction";
import useDatePicker from "../../hooks/useDatePicker";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import NoDataFoundImg from "../../assets/no-data-found.png";
import {
  clearBusesByRoute,
  fetchAlledBuses,
  fetchBusesByRoute,
} from "../../redux/Buses/BusesAction";
import { fetchRoutes } from "../../redux/Route/RouteAction";
import { BusesActionTypes } from "../../redux/Buses/BusesReducer";

type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TripsActionTypes | BusesActionTypes
>;

const Trips = () => {
  const {
    toDate,
    date,
    setDate,
    handleDateChange,
    handlePrevDate,
    handleNextDate,
  } = useDatePicker();
  const dispatch: AppDispatch = useDispatch();
  const { trips, loading } = useSelector((state: RootState) => state.trips);
  const { routes } = useSelector((state: RootState) => state.routes);
  const { bussesByRoute } = useSelector((state: RootState) => state.buses);

  const [newTrip, setNewTrip] = useState({
    routeId: "",
    busId: "",
    tripDate: "",
    isReturnTrip: false,
    departureTime: "",
    arrivalTime: "",
    price: 0,
  });

  console.log(trips);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTripId, setEditingTripId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(clearTrips());
    dispatch(fetchTripsByDate(date));
    dispatch(fetchRoutes());
  }, [dispatch, date]);

  useEffect(() => {
    dispatch(clearBusesByRoute());
    dispatch(fetchBusesByRoute(newTrip.routeId));
  }, [dispatch, newTrip.routeId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewTrip((prev) => {
      // Special handling for time fields
      if (name === "departureTime" || name === "arrivalTime") {
        const isoDateTime = combineDateTime(prev.tripDate, value); // Combine date and time
        return {
          ...prev,
          [name]: isoDateTime, // Store in ISO 8601 format
        };
      }

      // Ensure price is stored as a number
      if (name === "price") {
        return {
          ...prev,
          [name]: Number(value) || 0, // Convert to number or default to 0
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "departureTime" | "arrivalTime"
  ) => {
    const time = e.target.value; // Get the time input value
    setNewTrip((prev) => {
      const currentDateTime = prev[field] || ""; // Get the current datetime value or an empty string
      const datePart = currentDateTime.split("T")[0] || "2024-12-21"; // Default to a specific date if missing

      return {
        ...prev,
        [field]: `${datePart}T${time}`, // Combine the date with the new time
      };
    });
  };

  // Helper function to combine date and time into ISO 8601
  const combineDateTime = (date: string, time: string): string => {
    if (!date || !time) return ""; // Handle empty fields gracefully
    return `${date}T${time}:00.000+00:00`; // Combine date and time in ISO format
  };

  console.log(newTrip);

  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingTripId) {
      // Update bus
      // await dispatch(updateBuses(editingBusId, newBus));
    } else {
      // Add new trip
      await dispatch(createTrip(newTrip));
    }
    await dispatch(fetchAlledBuses());
    handleCloseModal();
  };

  const handleOpenModal = (trip: any = null) => {
    if (trip) {
      setEditingTripId(trip._id); // Use appropriate ID field
      setNewTrip({
        routeId: trip.route._id,
        busId: trip.busId,
        tripDate: trip.tripDate,
        isReturnTrip: trip.isReturnTrip,
        departureTime: trip.departureTime,
        arrivalTime: trip.arrivalTime,
        price: trip.price,
      });
    } else {
      setEditingTripId(null);
      setNewTrip({
        routeId: "",
        busId: "",
        tripDate: "",
        isReturnTrip: false,
        departureTime: "",
        arrivalTime: "",
        price: 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTripId(null);
    setNewTrip({
      routeId: "",
      busId: "",
      tripDate: "",
      isReturnTrip: false,
      departureTime: "",
      arrivalTime: "",
      price: 0,
    });
  };

  const handleDelete = async (busId: string, tripId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this trip?"
    );
    if (isConfirmed) {
      await dispatch(deleteTrip(busId, tripId));
    }
    dispatch(fetchTripsByDate(date));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Trips</h2>
        <div className="space-y-1 relative">
          <p className="text-xs text-[#323232] font-medium ml-1">Date</p>
          <div className="flex items-center">
            <input
              type="date"
              className="border border-[#E4E3E3] rounded-md placeholder:text-[#C6C6C6] text-sm w-[250px] uppercase hover:border-[#c7c6c6] p-2"
              value={date}
              defaultValue={toDate.toISOString().split("T"[0])}
              onChange={handleDateChange}
            />
            <div
              className="px-2 py-[10px] border rounded-md ml-4 cursor-pointer bg-white hover:border-[#c7c6c6]"
              onClick={handlePrevDate}
            >
              <MdArrowBackIosNew color="#545454" />
            </div>
            <div
              className="px-2 py-[10px] border rounded-md ml-2 cursor-pointer bg-white hover:border-[#c7c6c6]"
              onClick={handleNextDate}
            >
              <MdArrowForwardIos color="#545454" />
            </div>
            <div
              className="bg-[#B0E5F1] px-10 py-2 rounded-md ml-8 cursor-pointer hover:bg-[#8EDAEB]/50"
              onClick={() => {
                setDate(toDate.toISOString().split("T")[0]);
              }}
            >
              <p className="text-[11px] text-[#323232] font-semibold ">Today</p>
            </div>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleOpenModal()}
        >
          New Trip
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
                    <th className="py-3 px-4 text-left pr-12">Route</th>
                    <th className="py-3 px-4 text-left pr-12">
                      Departure Time
                    </th>
                    <th className="py-3 px-4 text-left pr-12">Arrival Time</th>
                    <th className="py-3 px-4 text-left pr-12">
                      Is Return Trip
                    </th>
                    <th className="py-3 px-4 text-left pr-12">Price</th>
                    <th className="py-3 px-4 text-left pr-12">Actions</th>
                  </tr>
                </thead>
                {trips.length > 0 ? (
                  <tbody>
                    {trips.map((item: any, index: any) => (
                      <tr
                        key={index}
                        className="text-sm text-[#323232] font-medium cursor-default"
                      >
                        <td className="py-2 px-4 flex items-center gap-4">
                          <div className="text-[15px] font-medium">
                            {item.registrationNumber}
                          </div>
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.route.startPoint.name} -{" "}
                          {item.route.endDestination.name}
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.departureTime.split("T")[1].slice(0, 5)}
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.arrivalTime.split("T")[1].slice(0, 5)}
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.isReturnTrip ? "Yes" : "No"}
                        </td>
                        <td className="py-2 px-4 text-left">{item.price}</td>
                        <td className="py-2 px-4 text-left">
                          <div className="flex items-center gap-5">
                            <FaRegEdit
                              size={20}
                              onClick={() => handleOpenModal(item)}
                              className="cursor-pointer text-blue-500 hover:text-blue-600"
                            />
                            <RiDeleteBin6Line
                              size={20}
                              onClick={() =>
                                handleDelete(item.busId, item.tripId)
                              }
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
              {editingTripId ? "Update Trip" : "Add New Trip"}
            </h2>
            <form onSubmit={handleEmployeeSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Route
                </label>
                <select
                  name="routeId"
                  value={newTrip.routeId}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>
                    Select the Route
                  </option>
                  {routes.map((route, index) => (
                    <option key={index} value={route._id}>
                      {route.startPoint.name} - {route.endDestination.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Bus
                </label>
                <select
                  name="busId"
                  value={newTrip.busId}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="" disabled>
                    Select the Bus
                  </option>
                  {bussesByRoute.map((bus, index) => (
                    <option key={index} value={bus._id}>
                      {bus.registrationNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="tripDate"
                  value={newTrip.tripDate.split("T")[0]}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Trip Date"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Is Return Trip
                </label>
                <select
                  name="isReturnTrip"
                  value={newTrip.isReturnTrip.toString()}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option>Select trip type</option>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Departure Time
                </label>
                <input
                  type="time"
                  name="departureTime"
                  value={
                    newTrip.departureTime
                      ? newTrip.departureTime.split("T")[1]
                      : ""
                  }
                  onChange={(e) => handleTimeChange(e, "departureTime")}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Departure Time"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Arrival Time
                </label>
                <input
                  type="time"
                  name="arrivalTime"
                  value={
                    newTrip.arrivalTime ? newTrip.arrivalTime.split("T")[1] : ""
                  }
                  onChange={(e) => handleTimeChange(e, "arrivalTime")}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Arrival Time"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Price
                </label>
                <div className="flex items-center gap-5">
                  <p className="text-gray-700 text-sm font-bold">Rs.</p>
                  <input
                    type="text"
                    name="price"
                    value={newTrip.price}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Price"
                  />
                </div>
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
                  {editingTripId ? "Update Trip" : "Add Trip"}
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

export default Trips;
