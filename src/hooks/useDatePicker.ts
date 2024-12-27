import { useState } from "react";

const useDatePicker = () => {
  const toDate = new Date();

  const [date, setDate] = useState(toDate.toString().split("T")[0]);

  const handleDateChange = (event: { target: { value: any } }) => {
    const newDate = event.target.value;

    if (newDate) {
      setDate(newDate);
    } else {
      event.target.value = date;
    }
  };

  const handlePrevDate = () => {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    const formattedDate = prevDate.toISOString().split("T")[0];
    setDate(formattedDate);
  };

  const handleNextDate = () => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const formattedDate = nextDate.toISOString().split("T")[0];
    setDate(formattedDate);
  };

  return {
    toDate,
    date,
    setDate,
    handleDateChange,
    handlePrevDate,
    handleNextDate,
  };
};
export default useDatePicker;
