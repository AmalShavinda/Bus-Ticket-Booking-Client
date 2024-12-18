import useBooking from "../../hooks/useBooking";

const ReservationSearch = () => {
  const { setStartPoint, setDestination, setDate, handleSearch } = useBooking();

  return (
    <div className="w-full">
      <div className="w-full bg-[#107ba86d] px-5 py-2 rounded-t-lg">
        <h2 className="text-sm text-white text-start font-bold capitalize">
          Online Seat Reservation
        </h2>
      </div>
      <div className="flex items-center gap-5 px-5 py-4 bg-[#266ea55a]">
        {/* <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
          placeholder="From"
          isClearable
          className="placeholder:uppercase text-start w-60 py-2"
        />
        <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
          placeholder="To"
          isClearable
          className="placeholder:uppercase text-start w-60 py-2"
        /> */}
        <input
          type="text"
          placeholder="from"
          className="capitalize px-4 py-1.5 rounded-sm w-60"
          onChange={(e) => setStartPoint(e.target.value)}
        />
        <input
          type="text"
          placeholder="To"
          className="capitalize px-4 py-1.5 rounded-sm w-60"
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          className="uppercase px-4 py-1.5 rounded-sm w-60"
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          className="px-8 py-2 bg-orange-600 rounded-sm text-sm font-bold text-white uppercase"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ReservationSearch;
