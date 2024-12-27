import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { BookingsActionTypes } from "../../redux/Bookings/BookingReducer";
import { useDispatch, useSelector } from "react-redux";
import NoDataFoundImg from "../../assets/no-data-found.png";
import { useEffect } from "react";
import { fetchBookings } from "../../redux/Bookings/BookingsAction";
import { RiDeleteBin6Line } from "react-icons/ri";

type AppDispatch = ThunkDispatch<RootState, unknown, BookingsActionTypes>;

const Bookings = () => {
  const dispatch: AppDispatch = useDispatch();
  const { bookings, loading } = useSelector(
    (state: RootState) => state.bookings
  );

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Bookings</h2>
        {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleOpenModal()}
        >
          New Bus
        </button> */}
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
                    <th className="py-3 px-4 text-left pr-12">Seats</th>
                    <th className="py-3 px-4 text-left pr-12">Total Seats</th>
                    <th className="py-3 px-4 text-left pr-12">
                      Payment Status
                    </th>
                    <th className="py-3 px-4 text-left pr-12">Payments</th>
                    <th className="py-3 px-4 text-left pr-12">booked By</th>
                    <th className="py-3 px-4 text-left pr-12">Trip Date</th>
                    <th className="py-3 px-4 text-left pr-12">Booking Date</th>
                    <th className="py-3 px-4 text-left pr-12">Actions</th>
                  </tr>
                </thead>
                {bookings.length > 0 ? (
                  <tbody>
                    {bookings.map((item: any, index: any) => (
                      <tr
                        key={index}
                        className="text-sm text-[#323232] font-medium cursor-default"
                      >
                        <td className="py-2 px-4 flex items-center gap-4">
                          <div className="text-[15px] font-medium">
                            {item.busId.registrationNumber}
                          </div>
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.routeId?.startPoint?.name} -{" "}
                          {item.routeId?.endDestination?.name}
                        </td>
                        <td className="py-2 px-4 text-left">{item.seats.join(", ")}</td>
                        <td className="py-2 px-4 text-center">{item.totalSeats}</td>
                        <td className="py-2 px-4 text-left">
                          {item.paymentStatus}
                        </td>
                        <td className="py-2 px-4 text-left">
                          Rs. {item.paymentDetails?.amount}.00
                        </td>
                        <td className="py-2 px-4 text-left">{item.username}</td>
                        <td className="py-2 px-4 text-left">
                          {item.tripDate.split("T")[0]}
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.bookingDate.split("T")[0]}
                        </td>
                        <td className="py-2 px-4 text-left">
                          <div className="flex items-center gap-5">
                            <RiDeleteBin6Line
                              size={20}
                              // onClick={() => handleDelete(item._id)}
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
    </div>
  );
};

export default Bookings;
