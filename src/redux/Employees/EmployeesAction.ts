import { Dispatch } from "react";
import {
  ADD_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  EmployeesActionTypes,
  FETCH_EMPLOYEES_FAILURE,
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
} from "./EmployeesReducer";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchEmployees = () => {
  return async (dispatch: Dispatch<EmployeesActionTypes>) => {
    dispatch({ type: FETCH_EMPLOYEES_REQUEST });
    const token = Cookies.get("access_token");
    console.log("Access Token:", token);
    if (!token) {
      dispatch({
        type: FETCH_EMPLOYEES_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/employees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: FETCH_EMPLOYEES_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_EMPLOYEES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const addEmployee = () => {
  return async (dispatch: Dispatch<EmployeesActionTypes>) => {
    dispatch({ type: FETCH_EMPLOYEES_REQUEST });
    const token = Cookies.get("access_token");
    console.log("Access Token:", token);
    if (!token) {
      dispatch({
        type: FETCH_EMPLOYEES_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/employees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: FETCH_EMPLOYEES_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_EMPLOYEES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const addLeaveEntry =
  (empData: any) => async (dispatch: Dispatch<EmployeesActionTypes>) => {
    dispatch({ type: ADD_EMPLOYEE_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/employees`,
        empData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to add employee");
      }

      dispatch({ type: ADD_EMPLOYEE_SUCCESS });
    } catch (error: any) {
      dispatch({ type: ADD_EMPLOYEE_FAILURE, payload: error.message });
    }
  };
