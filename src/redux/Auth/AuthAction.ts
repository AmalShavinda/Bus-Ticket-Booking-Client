import { Dispatch } from "redux";
import axios from "axios";
import Cookies from "js-cookie";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./AuthReducer";

// Login Action
export const login = (credentials: { username: string; password: string }) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      // Make API request
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Destructure the response
      const { token, details } = response.data;

      // Store token in cookies for persistence
      Cookies.set("access_token", token, {
        secure: true,
        sameSite: "strict",
      });

      // Optionally store user details in cookies or local state
      Cookies.set("user_details", JSON.stringify(details));

      // Dispatch successful login
      dispatch({ type: LOGIN_SUCCESS, payload: { token, user: details } });
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Failed to login. Please try again.";
        dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
      } else {
        dispatch({ type: LOGIN_FAILURE, payload: "An unknown error occurred" });
      }
    }
  };
};

export const signup = (userDetails: {
  firstname: string;
  username: string;
  email: string;
  password: string;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });
    try {
      // Make API request to register the user
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        userDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Destructure the response
      const { token, details, message } = response.data;

      // Store token in cookies for persistence
      Cookies.set("access_token", token, {
        secure: true,
        sameSite: "strict",
      });

      // Optionally store user details in cookies or local state
      Cookies.set("user_details", JSON.stringify(details));

      // Dispatch successful signup with message
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: { token, user: details, message },
      });

      // Optionally return message for component-level handling
      return message;
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to sign up. Please try again.";
        dispatch({ type: SIGNUP_FAILURE, payload: errorMessage });
      } else {
        dispatch({
          type: SIGNUP_FAILURE,
          payload: "An unknown error occurred",
        });
      }
    }
  };
};

// Logout Action
export const logout = () => {
  // Clear cookies
  Cookies.remove("access_token");
  Cookies.remove("user_details");
  return { type: LOGOUT };
};
