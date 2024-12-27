import { useEffect, useState } from "react";
import { RiSteering2Fill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import useBooking from "../../hooks/useBooking";
import {
  addSeatbooking,
  fetchSeatsForTrip,
} from "../../redux/Buses/BusesAction";
import { useParams } from "react-router-dom";

const Seats = () => {
  const {
    dispatch,
    seats,
    selectedSeats,
    setSelectedSeats,
    handleSeatSelection,
    isFormOpen,
    setIsFormOpen,
    paymentOption,
    setPaymentOption,
  } = useBooking();

  const { tripId } = useParams<{ tripId: any }>();
  const [price, setPrice] = useState(0);
  const [bookingData, setBookingData] = useState({
    busId: "",
    routeId: "",
    tripId: "",
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
    dispatch(fetchSeatsForTrip(tripId));
  }, [dispatch, tripId]);

  useEffect(() => {
    if (selectedSeats.length > 0 && seats?.data?.price) {
      const updatedPrice = selectedSeats.length * seats.data.price;
      setPrice(updatedPrice);
    } else {
      setPrice(0);
    }
  }, [selectedSeats, seats]);

  useEffect(() => {
    handleBookingData();
  }, [dispatch, selectedSeats, price]);

  const totalSeats = seats?.data?.seats || [];
  const backSeats = totalSeats.slice(-6); // Last 6 seats are the back row
  const remainingSeats = totalSeats.slice(0, totalSeats.length - 6); // Remove last 6 seats

  const rightSeats: any[] = [];
  const leftSeats: any[] = [];

  remainingSeats.forEach((seat: any, index: number) => {
    if (index % 5 < 3) {
      rightSeats.push(seat);
    } else {
      leftSeats.push(seat);
    }
  });

  // State for selected seats
  // const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // // Handle seat selection
  // const handleSeatSelection = (seat: any) => {
  //   if (seat.isReserved) return; // Prevent selecting reserved seats

  //   setSelectedSeats((prevSelected) => {
  //     if (prevSelected.includes(seat.seatNumber)) {
  //       // If seat is already selected, remove it
  //       return prevSelected.filter((s) => s !== seat.seatNumber);
  //     } else {
  //       // Otherwise, add it to the selected list
  //       return [...prevSelected, seat.seatNumber];
  //     }
  //   });
  // };

  const handleProceed = () => {
    if (selectedSeats.length > 0) {
      setIsFormOpen(true);
    }
  };

  const handleBookingData = async () => {
    await setBookingData({
      busId: seats.data.busId,
      routeId: seats.data.routeId,
      tripId: seats.data.tripId,
      username: "shavinda",
      seats: selectedSeats,
      tripDate: seats.data.tripDate,
      paymentDetails: {
        paymentMethod: "Debit Card",
        transactionId: "tx123456",
        amount: price,
      },
    });
  };

  const handlebooking = async () => {
    await dispatch(addSeatbooking(bookingData));
    setIsFormOpen(false);
    dispatch(fetchSeatsForTrip(tripId));
    setPrice(0);
    setSelectedSeats([]);
  };

  return (
    <div className="w-full px-20 py-10">
      {/* Legend */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div>
            <p className="text-sm">Reserved</p>
            <div className="bg-red-500 w-5 h-5 rounded-md mt-2"></div>
          </div>
          <div>
            <p className="text-sm">Available</p>
            <div className="bg-gray-300 w-5 h-5 rounded-md mt-2"></div>
          </div>
          <div>
            <p className="text-sm">Selected</p>
            <div className="bg-green-500 w-5 h-5 rounded-md mt-2"></div>
          </div>
        </div>
        <div className="">
          <p className="text-sm text-[#323232] font-medium">Total</p>
          <p className="text-base text-[#323232] font-bold">Rs. {price}.00</p>
        </div>
        <div
          className=" flex items-center justify-center gap-3 bg-orange-600 px-5 py-2 text-white text-sm font-semibold cursor-pointer"
          onClick={() => handleProceed()}
        >
          <FaArrowRightLong />
          <button>Proceed</button>
        </div>
      </div>

      {/* Seat Layout */}
      <div className="flex justify-center items-center mt-10">
        <RiSteering2Fill
          size={40}
          color="#323232"
          className="-rotate-90 mr-5 mt-[-220px]"
        />
        <div className="flex flex-col">
          {/* Right Seats */}
          <div className="flex flex-col flex-wrap h-36 w-[600px]">
            {rightSeats.map((seat: any) => (
              <div
                key={seat._id}
                onClick={() => handleSeatSelection(seat)}
                className={`w-10 h-8 ${
                  seat.isReserved
                    ? "bg-red-500" // Reserved seats
                    : selectedSeats.includes(seat.seatNumber)
                    ? "bg-green-500" // Selected seats
                    : "bg-gray-300" // Available seats
                } flex items-center justify-center mt-2 rounded-md cursor-pointer`}
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>

          {/* Left Seats */}
          <div className="flex flex-col flex-wrap h-28 w-[600px] mt-4">
            {leftSeats.map((seat: any) => (
              <div
                key={seat._id}
                onClick={() => handleSeatSelection(seat)}
                className={`w-10 h-8 ${
                  seat.isReserved
                    ? "bg-red-500"
                    : selectedSeats.includes(seat.seatNumber)
                    ? "bg-green-500"
                    : "bg-gray-300"
                } flex items-center justify-center mt-2 rounded-md cursor-pointer`}
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>
        </div>

        {/* Back Row */}
        <div className="flex flex-col mt-[-30px]">
          {backSeats.map((seat: any) => (
            <div
              key={seat._id}
              onClick={() => handleSeatSelection(seat)}
              className={`w-10 h-8 ${
                seat.isReserved
                  ? "bg-red-500"
                  : selectedSeats.includes(seat.seatNumber)
                  ? "bg-green-500"
                  : "bg-gray-300"
              } flex items-center justify-center mt-2 rounded-md cursor-pointer`}
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>
      </div>
      {isFormOpen && selectedSeats.length > 0 && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => {
              setIsFormOpen(false);
            }}
          ></div>
          <div
            className="fixed inset-0 flex items-center justify-center z-20 p-4"
            onClick={() => {
              setIsFormOpen(false);
            }}
          >
            <div
              className="w-[400px] h-[600px] bg-white shadow-lg overflow-y-auto rounded-md px-8 py-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-5 items-center">
                <p className="text-lg font-bold tracking-wide">
                  Your booking details
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium">Total Price</p>
                <p className="text-lg font-semibold">Rs. {price}.00</p>
              </div>
              <div className="mt-2">
                <p className="text-xs font-medium">Selected Seats</p>
                <div className="flex items-center gap-1">
                  {selectedSeats.map((item) => (
                    <p className="text-sm font-semibold">{item},</p>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <p className="text-lg text-gray-600 font-semibold tracking-wide">
                  Payments
                </p>
              </div>
              <div className="mt-3">
                {/* Payment Options */}
                <div className="flex items-center gap-5">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="payNow"
                      checked={paymentOption === "payNow"}
                      onChange={(e) => setPaymentOption(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium tracking-wide">
                      Pay Now
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="payAtBus"
                      checked={paymentOption === "payAtBus"}
                      onChange={(e) => setPaymentOption(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium tracking-wide">
                      Pay at the Bus
                    </span>
                  </label>
                </div>
              </div>
              {paymentOption === "payNow" ? (
                <div className="text-[#323232]">
                  <div className="mt-5">
                    <p className="text-sm font-medium tracking-wide">
                      Card Holder Name{" "}
                      <span className="text-sm text-red-600 font-bold">*</span>
                    </p>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="px-3 py-2 text-sm font-medium border rounded-md w-full mt-2"
                      placeholder="Card Holder Name"
                    />
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium tracking-wide">
                      Card Number{" "}
                      <span className="text-sm text-red-600 font-bold">*</span>
                    </p>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="px-3 py-2 text-sm font-medium border rounded-md w-full mt-2"
                      placeholder="Card Number"
                    />
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="mt-3">
                      <p className="text-sm font-medium tracking-wide">
                        Expire Date
                      </p>
                      <input
                        type="date"
                        name=""
                        id=""
                        className="px-3 py-2 text-sm font-medium border rounded-md w-40 mt-2 uppercase"
                        placeholder="Expire Date"
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium tracking-wide">CVV</p>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="px-3 py-2 text-sm font-medium border rounded-md w-28 mt-2 uppercase"
                        placeholder="CVV"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8">
                  <div className="flex items-center gap-3">
                    <IoIosWarning color="#ea580c" size={20} />
                    <p className="text-sm text-gray-600">Warning</p>
                  </div>

                  <p className="text-sm text-gray-600">
                    Your booking is cancelled if you are not present on time.
                  </p>
                </div>
              )}
              <div className="absolute right-10 bottom-8">
                <button
                  className="px-10 py-2 bg-orange-600 rounded-lg text-sm text-white font-bold"
                  onClick={() => handlebooking()}
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Seats;
