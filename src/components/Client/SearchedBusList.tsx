import { GoTriangleRight } from "react-icons/go";
import useBooking from "../../hooks/useBooking";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchSearchedBuses } from "../../redux/Buses/BusesAction";

const SearchedBusList = () => {
  const { removeSeconds, searchedBuses, handleSelectingTrip, dispatch } =
    useBooking();

  const { startPoint, destination, date } = useParams<{
    startPoint: any;
    destination: any;
    date: any;
  }>();

  useEffect(() => {
    dispatch(fetchSearchedBuses(startPoint, destination, date));
  }, [dispatch]);

  return (
    <div className="px-10">
      {searchedBuses.data.length > 0 ? (
        <div>
          {searchedBuses.data.map((item) => (
            <div
              className=" flex flex-col items-center justify-center gap-4 my-10"
              key={item._id}
            >
              {item.tripSchedules.map((trip: any) => (
                <div className="w-full" key={trip.tripId}>
                  <div className="bg-blue-800 w-full h-10 rounded-t-lg"> </div>
                  <div className="flex items-center justify-start gap-10 bg-white px-8 py-8">
                    <div>
                      <p className="text-xs tracking-wider">Departure</p>
                      <p className="text-base font-bold">
                        {removeSeconds(trip.departureTime.split("T")[1])}
                      </p>
                    </div>
                    <div>
                      <GoTriangleRight size={40} color="#FFD788" />
                    </div>
                    <div>
                      <p className="text-xs tracking-wider">Arrival</p>
                      <p className="text-base font-bold">
                        {removeSeconds(trip.arrivalTime.split("T")[1])}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs tracking-wider">Date</p>
                      <p className="text-base font-bold">
                        {trip.tripDate.split("T")[0]}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs tracking-wider">Bus Number</p>
                      <p className="text-base font-bold">{item.busNumber}</p>
                    </div>
                    <button
                      className="bg-[#4BC0A4] text-base text-white font-semibold rounded-sm px-6 py-2"
                      onClick={() => handleSelectingTrip(trip.tripId)}
                    >
                      Book Seats
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
              ))}
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

export default SearchedBusList;
