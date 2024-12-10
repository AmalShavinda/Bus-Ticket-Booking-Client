import { useState } from "react";
import Select from "react-select";

const ReservationSearch = () => {
  const options = [
    { value: "colombo-kandy", label: "Colombo to Kandy" },
    { value: "galle-matara", label: "Galle to Matara" },
    { value: "jaffna-colombo", label: "Jaffna to Colombo" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (option: any) => {
    setSelectedOption(option);
    console.log("Selected:", option);
  };

  return (
    <div className="w-full">
      <div className="w-full bg-[#107ba86d] px-5 py-2 rounded-t-lg">
        <h2 className="text-sm text-white text-start font-bold capitalize">
          Online Seat Reservation
        </h2>
      </div>
      <div className="flex items-center gap-5 px-5 py-4 bg-[#266ea55a]">
        <Select
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
        />
        <input type="date" className="uppercase px-4 py-1.5 rounded-sm w-60" />
        <button className="px-8 py-2 bg-orange-600 rounded-sm text-sm font-bold text-white uppercase">
          Search
        </button>
      </div>
    </div>
  );
};

export default ReservationSearch;
