import { Dispatch } from "react";
import {
  BookingsActionTypes,
  FETCH_BOOKINGS_FAILURE,
  FETCH_BOOKINGS_REQUEST,
  FETCH_BOOKINGS_SUCCESS,
} from "./BookingReducer";
import Cookies from "js-cookie";
import axios from "axios";

export const fetchBookings = () => {
  return async (dispatch: Dispatch<BookingsActionTypes>) => {
    dispatch({ type: FETCH_BOOKINGS_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_BOOKINGS_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: FETCH_BOOKINGS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_BOOKINGS_FAILURE,
        payload: error.message,
      });
    }
  };
};
