import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { RoutesActionTypes } from "../../redux/Route/RouteReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createRoute,
  deleteRoute,
  fetchRoutes,
  updateRoute,
} from "../../redux/Route/RouteAction";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import NoDataFoundImg from "../../assets/no-data-found.png";
import { FaCirclePlus } from "react-icons/fa6";

type AppDispatch = ThunkDispatch<RootState, unknown, RoutesActionTypes>;

const Route = () => {
  const dispatch: AppDispatch = useDispatch();
  const { routes, loading } = useSelector((state: RootState) => state.routes);

  useEffect(() => {
    dispatch(fetchRoutes());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingRouteId, setEditingRouteId] = useState<string | null>(null);
  const [newRoute, setNewRoute] = useState({
    startPoint: { name: "" },
    endDestination: { name: "" },
    subStations: [{ name: "" }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewRoute((prev) => ({
      ...prev,
      [name]: { name: value },
    }));
  };

  const handleSubStationChange = (index: number, value: string) => {
    const updatedSubStations = [...newRoute.subStations];
    updatedSubStations[index] = { name: value };
    setNewRoute((prev) => ({
      ...prev,
      subStations: updatedSubStations,
    }));
  };

  const addSubStation = () => {
    setNewRoute((prev) => ({
      ...prev,
      subStations: [...prev.subStations, { name: "" }],
    }));
  };

  const removeSubStation = (index: number) => {
    setNewRoute((prev) => ({
      ...prev,
      subStations: prev.subStations.filter((_, i) => i !== index),
    }));
  };

  const handleEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingRouteId) {
      // Update employee
      await dispatch(updateRoute(editingRouteId, newRoute));
    } else {
      // Add new employee
      await dispatch(createRoute(newRoute));
    }
    await dispatch(fetchRoutes());
    handleCloseModal();
  };

  const handleOpenModal = (route: any = null) => {
    if (route) {
      setEditingRouteId(route._id);
      setNewRoute({
        startPoint: route.startPoint || { name: "" },
        endDestination: route.endDestination || { name: "" },
        subStations: route.subStations || [{ name: "" }],
      });
    } else {
      setEditingRouteId(null);
      setNewRoute({
        startPoint: { name: "" },
        endDestination: { name: "" },
        subStations: [{ name: "" }],
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRouteId(null);
    setNewRoute({
      startPoint: { name: "" },
      endDestination: { name: "" },
      subStations: [{ name: "" }],
    });
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this route?"
    );
    if (isConfirmed) {
      await dispatch(deleteRoute(id));
    }
    dispatch(fetchRoutes());
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Routes</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleOpenModal()}
        >
          New Route
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
                    <th className="py-3 px-4 text-left">Start Point</th>
                    <th className="py-3 px-4 text-left pr-12">
                      End Destination
                    </th>
                    <th className="py-3 px-4 text-left pr-12">Sub Stations</th>
                    <th className="py-3 px-4 text-left pr-12">Actions</th>
                  </tr>
                </thead>
                {routes.length > 0 ? (
                  <tbody>
                    {routes.map((item: any, index: any) => (
                      <tr
                        key={index}
                        className="text-sm text-[#323232] font-medium cursor-default"
                      >
                        <td className="py-2 px-4 flex items-center gap-4">
                          <div className="text-[15px] font-medium">
                            {item.startPoint.name}
                          </div>
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.endDestination.name}
                        </td>

                        <td className="py-2 px-4 text-left">
                          {item.subStations.map(
                            (station: any) => station.name + ", "
                          )}
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
              {editingRouteId ? "Update Route" : "Add New Route"}
            </h2>
            <form onSubmit={handleEmployeeSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Start Point
                </label>
                <input
                  type="text"
                  name="startPoint"
                  value={newRoute.startPoint.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Start Point"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  End Destination
                </label>
                <input
                  type="text"
                  name="endDestination"
                  value={newRoute.endDestination.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="End Destination"
                  required
                />
              </div>

              {/* <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Sub Stations
                  </label>
                  <FaCirclePlus
                    size={20}
                    color="green"
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    name="subStations"
                    value={newRoute.subStations}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Add a Sub-Station"
                  />
                  <RiDeleteBin6Line
                    size={24}
                    //   onClick={() => handleDelete(item._id)}
                    className="cursor-pointer text-red-500 hover:text-red-600"
                  />
                </div>
              </div> */}

              <div className="mb-4">
                <label>Sub Stations</label>
                {newRoute.subStations.map((subStation, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={subStation.name}
                      onChange={(e) =>
                        handleSubStationChange(index, e.target.value)
                      }
                      className="border px-2 py-1"
                    />
                    <RiDeleteBin6Line
                      size={20}
                      className="ml-2 text-red-500 cursor-pointer"
                      onClick={() => removeSubStation(index)}
                    />
                  </div>
                ))}
                <FaCirclePlus
                  size={20}
                  color="green"
                  className="cursor-pointer"
                  onClick={addSubStation}
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
                  {editingRouteId ? "Update Route" : "Add Route"}
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

export default Route;
