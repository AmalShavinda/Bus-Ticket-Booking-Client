import { useEffect, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { BusesActionTypes } from "../redux/Buses/BusesReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearchedBuses,
  clearSeatsForTrip,
  fetchSearchedBuses,
  fetchSeatsForTrip,
} from "../redux/Buses/BusesAction";
import { useNavigate } from "react-router-dom";

type AppDispatch = ThunkDispatch<RootState, unknown, BusesActionTypes>;

const useBooking = () => {
  const dispatch: AppDispatch = useDispatch();
  const { searchedBuses } = useSelector((state: RootState) => state.buses);
  const { seats } = useSelector((state: RootState) => state.buses);
  const navigate = useNavigate();
  const [startPoint, setStartPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [paymentOption, setPaymentOption] = useState<string>("payNow");

  useEffect(() => {
    dispatch(fetchSeatsForTrip(seats.data.tripId));
  }, [dispatch]);

  const removeSeconds = (timeStr?: string | null): string => {
    if (!timeStr) {
      return "";
    }

    const [hours, minutes] = timeStr.split(":");
    return `${hours}:${minutes}`;
  };

  const handleSearch = async () => {
    if (!startPoint || !destination || !date) {
      alert("Please fill in all fields");
      return;
    }
    dispatch(clearSearchedBuses());
    try {
      // Await the dispatch if it returns a promise
      await dispatch(fetchSearchedBuses(startPoint, destination, date));
      navigate(
        `/searchedbuses/startpoint/${startPoint}/destination/${destination}/date/${date}`
      );
    } catch (error) {
      alert("Failed to fetch buses. Please try again.");
    }
  };

  const handleSelectingTrip = async (tripId: string) => {
    if (!tripId) {
      alert("Please select a trip");
      return;
    }
    dispatch(clearSeatsForTrip);
    await dispatch(fetchSeatsForTrip(tripId));
    navigate(`/seats/tripId/${tripId}`);
  };

  // Handle seat selection
  const handleSeatSelection = (seat: any) => {
    if (seat.isReserved) return; // Prevent selecting reserved seats

    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seat.seatNumber)) {
        // If seat is already selected, remove it
        return prevSelected.filter((s) => s !== seat.seatNumber);
      } else {
        // Otherwise, add it to the selected list
        return [...prevSelected, seat.seatNumber];
      }
    });
  };

  return {
    dispatch,
    startPoint,
    setStartPoint,
    destination,
    setDestination,
    removeSeconds,
    setDate,
    searchedBuses,
    handleSearch,
    handleSelectingTrip,
    seats,
    selectedSeats,
    setSelectedSeats,
    handleSeatSelection,
    isFormOpen,
    setIsFormOpen,
    paymentOption,
    setPaymentOption,
  };
};

export default useBooking;
