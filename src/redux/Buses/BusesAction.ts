import axios from "axios";
import Cookies from "js-cookie";
import {
  BusesActionTypes,
  FETCH_SEARCHED_BUSES_FAILURE,
  FETCH_SEARCHED_BUSES_REQUEST,
  FETCH_SEARCHED_BUSES_SUCCESS,
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
