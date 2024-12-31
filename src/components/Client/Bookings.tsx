import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { BookingsActionTypes } from "../../redux/Bookings/BookingReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBookingsByUsedId } from "../../redux/Bookings/BookingsAction";
import { GoTriangleRight } from "react-icons/go";

type AppDispatch = ThunkDispatch<RootState, unknown, BookingsActionTypes>;

const Bookings = () => {
  const dispatch: AppDispatch = useDispatch();
  const { bookingsByUserId } = useSelector(
    (state: RootState) => state.bookings
  );
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchBookingsByUsedId(user._id));
  }, [dispatch]);

  return (
    <div className="px-10">
      {bookingsByUserId.length > 0 ? (
        <div>
          {bookingsByUserId.map((item) => (
            <div
              className=" flex flex-col items-center justify-center gap-4 my-10"
              key={item._id}
            >
              <div className="w-full" key={item._id}>
                <div className="bg-blue-800 w-full h-10 rounded-t-lg"> </div>
                <div className="flex items-center justify-start gap-12 bg-white px-8 py-8">
                  <div>
                    <p className="text-xs tracking-wider">Bus Number</p>
                    <p className="text-base font-bold">
                      {item.busId.registrationNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs tracking-wider">Start point</p>
                    <p className="text-base font-bold">
                      {item.routeId.startPoint.name}
                    </p>
                  </div>
                  <div>
                    <GoTriangleRight size={40} color="#FFD788" />
                  </div>
                  <div>
                    <p className="text-xs tracking-wider">Destination</p>
                    <p className="text-base font-bold">
                      {item.routeId.endDestination.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs tracking-wider">Trip Date</p>
                    <p className="text-base font-bold">
                      {item.tripDate.split("T")[0]}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs tracking-wider">Booking Date</p>
                    <p className="text-base font-bold">
                      {item.bookingDate.split("T")[0]}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs tracking-wider">
                      Reserved Seats Date
                    </p>
                    <p className="text-base font-bold">
                      {item.seats.join(", ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs tracking-wider">
                      Total Charges
                    </p>
                    <p className="text-base font-bold">
                      {item.price?.join(", ")}
                    </p>
                  </div>

                  <button
                    className="bg-[#4BC0A4] text-base text-white font-semibold rounded-sm px-6 py-2"
                    //   onClick={() => handleSelectingTrip(trip.tripId)}
                  >
                    Cancel Booking
                  </button>
                </div>
                <div className="bg-[#323232] w-full h-10 rounded-b-lg"> </div>
                {/* <div>
                        {trip.reservedSeats.map((seat) => (
                          <div>
                            <div>{seat.seatNumber}</div>
                          </div>
                        ))}
                      </div> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-lg font-bold text-center">No buses found</p>
        </div>
      )}
    </div>
  );
};

export default Bookings;
