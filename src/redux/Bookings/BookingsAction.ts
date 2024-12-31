import { Dispatch } from "react";
import {
  BookingsActionTypes,
  CLEAR_BOOKINGS_BUSID,
  FETCH_BOOKINGS_BUSID_FAILURE,
  FETCH_BOOKINGS_BUSID_REQUEST,
  FETCH_BOOKINGS_BUSID_SUCCESS,
  FETCH_BOOKINGS_FAILURE,
  FETCH_BOOKINGS_REQUEST,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_BOOKINGS_USERID_FAILURE,
  FETCH_BOOKINGS_USERID_REQUEST,
  FETCH_BOOKINGS_USERID_SUCCESS,
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

export const fetchBookingsByUsedId = (userId: string) => {
  return async (dispatch: Dispatch<BookingsActionTypes>) => {
    dispatch({ type: FETCH_BOOKINGS_USERID_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_BOOKINGS_USERID_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/bookings/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: FETCH_BOOKINGS_USERID_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_BOOKINGS_USERID_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchBookingsByBusId = (busId: string, date: string) => {
  return async (dispatch: Dispatch<BookingsActionTypes>) => {
    dispatch({ type: FETCH_BOOKINGS_BUSID_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_BOOKINGS_BUSID_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/bookings/bus/${busId}?tripDate=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: FETCH_BOOKINGS_BUSID_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_BOOKINGS_BUSID_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const clearBookingsBusId = (): BookingsActionTypes => ({
  type: CLEAR_BOOKINGS_BUSID,
});
