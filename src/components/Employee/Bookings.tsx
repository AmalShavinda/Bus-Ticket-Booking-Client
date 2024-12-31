import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { BookingsActionTypes } from "../../redux/Bookings/BookingReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  clearBookingsBusId,
  fetchBookingsByBusId,
} from "../../redux/Bookings/BookingsAction";
import { RiDeleteBin6Line } from "react-icons/ri";
import NoDataFoundImg from "../../assets/no-data-found.png";
import useDatePicker from "../../hooks/useDatePicker";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

type AppDispatch = ThunkDispatch<RootState, unknown, BookingsActionTypes>;

const Bookings = () => {
  const {
    toDate,
    date,
    setDate,
    handleDateChange,
    handlePrevDate,
    handleNextDate,
  } = useDatePicker();
  const dispatch: AppDispatch = useDispatch();
  const { bookingsByBusId, loading } = useSelector(
    (state: RootState) => state.bookings
  );
  const { user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(clearBookingsBusId());
    dispatch(fetchBookingsByBusId(user?.assignedBus, date));
  }, [dispatch, date]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Bookings</h2>
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
                {bookingsByBusId.length > 0 ? (
                  <tbody>
                    {bookingsByBusId.map((item: any, index: any) => (
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
                        <td className="py-2 px-4 text-left">
                          {item.seats.join(", ")}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {item.totalSeats}
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.paymentStatus}
                        </td>
                        <td className="py-2 px-4 text-left">
                          Rs. {item.paymentDetails?.amount}.00
                        </td>
                        <td className="py-2 px-4 text-left">
                          {item.userId?.firstname}
                        </td>
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
