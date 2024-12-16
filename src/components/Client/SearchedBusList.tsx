import { useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { BusesActionTypes } from "../../redux/Buses/BusesReducer";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchedBuses } from "../../redux/Buses/BusesAction";

type AppDispatch = ThunkDispatch<RootState, unknown, BusesActionTypes>;

const SearchedBusList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { searchedBuses } = useSelector(
    (state: RootState) => state.searchedBuses
  );

  useEffect(() => {
    dispatch(fetchSearchedBuses("matara", "colombo", "2024-12-16"));
  }, [dispatch]);

  console.log(searchedBuses);
  return (
    <div>
      <div>
        {searchedBuses.data.map((item) => (
          <div className=" flex items-center justify-center gap-4 mb-9">
            {item.tripSchedules.map((trip: any) => (
              <div className="flex flex-col items-center justify-center gap-2 bg-blue-500 px-8 py-3 mt-4">
                <p>{item.busNumber}</p>

                <p>{trip.tripDate.split("T")[0]}</p>
                <p>{trip.arrivalTime.split("T")[1]}</p>
                <p>{trip.tripDate.split("T")[0]}</p>
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
    </div>
  );
};

export default SearchedBusList;
