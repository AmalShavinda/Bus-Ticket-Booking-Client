import { Dispatch } from "react";
import {
  ADD_TRIP_FAILURE,
  ADD_TRIP_REQUEST,
  ADD_TRIP_SUCCESS,
  CLEAR_TRIPS,
  DELETE_TRIP_FAILURE,
  DELETE_TRIP_REQUEST,
  DELETE_TRIP_SUCCESS,
  FETCH_TRIPS_BY_DATE_FAILURE,
  FETCH_TRIPS_BY_DATE_REQUEST,
  FETCH_TRIPS_BY_DATE_SUCCESS,
  TripsActionTypes,
} from "./TripsReducer";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchTripsByDate = (date: string) => {
  return async (dispatch: Dispatch<TripsActionTypes>) => {
    dispatch({ type: FETCH_TRIPS_BY_DATE_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_TRIPS_BY_DATE_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/trips/date?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: FETCH_TRIPS_BY_DATE_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_TRIPS_BY_DATE_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createTrip =
  (busData: any) => async (dispatch: Dispatch<TripsActionTypes>) => {
    dispatch({ type: ADD_TRIP_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/trips`,
        busData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to create trip");
      }

      dispatch({ type: ADD_TRIP_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_TRIP_FAILURE,
        payload: error.message,
      });
    }
  };

export const clearTrips = (): TripsActionTypes => ({
  type: CLEAR_TRIPS,
});

export const deleteTrip =
  (busId: string, tripId: string) =>
  async (dispatch: Dispatch<TripsActionTypes>) => {
    dispatch({ type: DELETE_TRIP_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/trips/buses/${busId}/trips/${tripId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to delete trip");
      }

      dispatch({ type: DELETE_TRIP_SUCCESS });
    } catch (error: any) {
      dispatch({ type: DELETE_TRIP_FAILURE, payload: error.message });
    }
  };
