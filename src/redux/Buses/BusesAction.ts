import axios from "axios";
import Cookies from "js-cookie";
import {
  ADD_BUSES_FAILURE,
  ADD_BUSES_REQUEST,
  ADD_BUSES_SUCCESS,
  BusesActionTypes,
  CLEAR_SEARCHED_BUSES,
  CLEAR_SEATS_FOR_TRIP,
  DELETE_BUSES_FAILURE,
  DELETE_BUSES_REQUEST,
  DELETE_BUSES_SUCCESS,
  FETCH_ALL_BUSES_FAILURE,
  FETCH_ALL_BUSES_REQUEST,
  FETCH_ALL_BUSES_SUCCESS,
  FETCH_SEARCHED_BUSES_FAILURE,
  FETCH_SEARCHED_BUSES_REQUEST,
  FETCH_SEARCHED_BUSES_SUCCESS,
  FETCH_SEATS_FOR_TRIP_FAILURE,
  FETCH_SEATS_FOR_TRIP_REQUEST,
  FETCH_SEATS_FOR_TRIP_SUCCESS,
  POST_BOOKING_SEATS_FOR_TRIP_FAILURE,
  POST_BOOKING_SEATS_FOR_TRIP_REQUEST,
  POST_BOOKING_SEATS_FOR_TRIP_SUCCESS,
} from "./BusesReducer";
import { Dispatch } from "react";

export const fetchSearchedBuses = (
  startPoint: string,
  destination: string,
  date: string
) => {
  return async (dispatch: Dispatch<BusesActionTypes>) => {
    dispatch({ type: FETCH_SEARCHED_BUSES_REQUEST });
    const token = Cookies.get("access_token");
    console.log("Access Token:", token);
    if (!token) {
      dispatch({
        type: FETCH_SEARCHED_BUSES_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/buses/search?startPoint=${startPoint}&destination=${destination}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: FETCH_SEARCHED_BUSES_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_SEARCHED_BUSES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchAlledBuses = () => {
  return async (dispatch: Dispatch<BusesActionTypes>) => {
    dispatch({ type: FETCH_ALL_BUSES_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_ALL_BUSES_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/buses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: FETCH_ALL_BUSES_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_ALL_BUSES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchSeatsForTrip = (tripId: string) => {
  return async (dispatch: Dispatch<BusesActionTypes>) => {
    dispatch({ type: FETCH_SEATS_FOR_TRIP_REQUEST });
    const token = Cookies.get("access_token");
    console.log("Access Token:", token);
    if (!token) {
      dispatch({
        type: FETCH_SEATS_FOR_TRIP_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/buses/seats?tripId=${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: FETCH_SEATS_FOR_TRIP_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_SEATS_FOR_TRIP_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const addSeatbooking =
  (bookingData: any) => async (dispatch: Dispatch<BusesActionTypes>) => {
    dispatch({ type: POST_BOOKING_SEATS_FOR_TRIP_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/bookings`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to booking seats");
      }

      dispatch({ type: POST_BOOKING_SEATS_FOR_TRIP_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: POST_BOOKING_SEATS_FOR_TRIP_FAILURE,
        payload: error.message,
      });
    }
  };

export const clearSearchedBuses = (): BusesActionTypes => ({
  type: CLEAR_SEARCHED_BUSES,
});

export const clearSeatsForTrip = (): BusesActionTypes => ({
  type: CLEAR_SEATS_FOR_TRIP,
});

export const addBuses =
  (busData: any) => async (dispatch: Dispatch<BusesActionTypes>) => {
    dispatch({ type: ADD_BUSES_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/buses`,
        busData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to create buses");
      }

      dispatch({ type: ADD_BUSES_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_BUSES_FAILURE,
        payload: error.message,
      });
    }
  };

export const updateBuses =
  (id: string, busData: any) =>
  async (dispatch: Dispatch<BusesActionTypes>) => {
    dispatch({ type: ADD_BUSES_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/buses/${id}`,
        busData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to update buses");
      }

      dispatch({ type: ADD_BUSES_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_BUSES_FAILURE,
        payload: error.message,
      });
    }
  };

export const deleteBuses =
  (id: string) => async (dispatch: Dispatch<BusesActionTypes>) => {
    dispatch({ type: DELETE_BUSES_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/buses/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to delete bus");
      }

      dispatch({ type: DELETE_BUSES_SUCCESS });
    } catch (error: any) {
      dispatch({ type: DELETE_BUSES_FAILURE, payload: error.message });
    }
  };
