import { useEffect, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/store";
import { BusesActionTypes } from "../redux/Buses/BusesReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  addSeatbooking,
  clearSearchedBuses,
  clearSeatsForTrip,
  fetchSearchedBuses,
  fetchSeatsForTrip,
} from "../redux/Buses/BusesAction";
import { useNavigate } from "react-router-dom";

type AppDispatch = ThunkDispatch<RootState, unknown, BusesActionTypes>;

const useBooking = () => {
  const dispatch: AppDispatch = useDispatch();
  const { searchedBuses } = useSelector(
    (state: RootState) => state.searchedBuses
  );
  const { seats } = useSelector((state: RootState) => state.searchedBuses);
  const navigate = useNavigate();
  const [startPoint, setStartPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [price, setPrice] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [paymentOption, setPaymentOption] = useState<string>("payNow");
  const [bookingData, setBookingData] = useState({
    busId: "",
    routeId: "",
    username: "",
    seats: {},
    tripDate: "",
    paymentDetails: {
      paymentMethod: "",
      transactionId: "",
      amount: 0,
    },
  });

  useEffect(() => {
    dispatch(fetchSeatsForTrip(seats.data.tripId));
  }, [dispatch]);

  console.log(searchedBuses);

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
      console.error("Error fetching searched buses:", error);
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

  const handlebooking = async () => {
    setBookingData({
      busId: seats.data.busId,
      routeId: seats.data.routeId,
      username: "",
      seats: selectedSeats,
      tripDate: seats.data.tripDate,
      paymentDetails: {
        paymentMethod: "Debit Card",
        transactionId: "",
        amount: price,
      },
    });
    await dispatch(addSeatbooking(bookingData));
    setIsFormOpen(false);
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
    handleSeatSelection,
    price,
    setPrice,
    isFormOpen,
    setIsFormOpen,
    paymentOption,
    setPaymentOption,
    handlebooking,
  };
};

export default useBooking;
