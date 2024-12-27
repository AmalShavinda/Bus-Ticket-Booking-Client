import { Dispatch } from "react";
import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  UsersActionTypes,
} from "./UserReducer";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchUsers = () => {
  return async (dispatch: Dispatch<UsersActionTypes>) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    const token = Cookies.get("access_token");
    if (!token) {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_USERS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createUser =
  (userData: any) => async (dispatch: Dispatch<UsersActionTypes>) => {
    dispatch({ type: ADD_USER_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to add user");
      }

      dispatch({ type: ADD_USER_SUCCESS });
    } catch (error: any) {
      dispatch({ type: ADD_USER_FAILURE, payload: error.message });
    }
  };

export const updateUser =
  (id: string, userData: any) =>
  async (dispatch: Dispatch<UsersActionTypes>) => {
    dispatch({ type: ADD_USER_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/${id}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to update user");
      }

      dispatch({ type: ADD_USER_SUCCESS });
    } catch (error: any) {
      dispatch({ type: ADD_USER_FAILURE, payload: error.message });
    }
  };

export const deleteUser =
  (id: string) => async (dispatch: Dispatch<UsersActionTypes>) => {
    dispatch({ type: DELETE_USER_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/users/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to update employee");
      }

      dispatch({ type: DELETE_USER_SUCCESS });
    } catch (error: any) {
      dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
    }
  };
