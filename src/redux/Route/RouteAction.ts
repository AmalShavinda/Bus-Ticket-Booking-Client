import { Dispatch } from "react";
import {
  ADD_ROUTES_FAILURE,
  ADD_ROUTES_REQUEST,
  ADD_ROUTES_SUCCESS,
  DELETE_ROUTES_FAILURE,
  DELETE_ROUTES_REQUEST,
  DELETE_ROUTES_SUCCESS,
  FETCH_ROUTES_FAILURE,
  FETCH_ROUTES_REQUEST,
  FETCH_ROUTES_SUCCESS,
  RoutesActionTypes,
} from "./RouteReducer";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchRoutes = () => {
  return async (dispatch: Dispatch<RoutesActionTypes>) => {
    dispatch({ type: FETCH_ROUTES_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_ROUTES_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/routes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: FETCH_ROUTES_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_ROUTES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createRoute =
  (routeData: any) => async (dispatch: Dispatch<RoutesActionTypes>) => {
    dispatch({ type: ADD_ROUTES_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/routes`,
        routeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to create route");
      }

      dispatch({ type: ADD_ROUTES_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_ROUTES_FAILURE,
        payload: error.message,
      });
    }
  };

export const updateRoute =
  (id: string, routeData: any) =>
  async (dispatch: Dispatch<RoutesActionTypes>) => {
    dispatch({ type: ADD_ROUTES_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/routes/${id}`,
        routeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to update route");
      }

      dispatch({ type: ADD_ROUTES_SUCCESS });
    } catch (error: any) {
      dispatch({
        type: ADD_ROUTES_FAILURE,
        payload: error.message,
      });
    }
  };

export const deleteRoute =
  (id: string) => async (dispatch: Dispatch<RoutesActionTypes>) => {
    dispatch({ type: DELETE_ROUTES_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/routes/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to delete route");
      }

      dispatch({ type: DELETE_ROUTES_SUCCESS });
    } catch (error: any) {
      dispatch({ type: DELETE_ROUTES_FAILURE, payload: error.message });
    }
  };
