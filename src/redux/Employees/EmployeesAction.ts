import { Dispatch } from "react";
import {
  ADD_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  EmployeesActionTypes,
  FETCH_CONDUCTORS_FAILURE,
  FETCH_CONDUCTORS_REQUEST,
  FETCH_CONDUCTORS_SUCCESS,
  FETCH_DRIVERS_FAILURE,
  FETCH_DRIVERS_REQUEST,
  FETCH_DRIVERS_SUCCESS,
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

export const createEmployee =
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

export const updateEmployee =
  (id: string, empData: any) =>
  async (dispatch: Dispatch<EmployeesActionTypes>) => {
    dispatch({ type: ADD_EMPLOYEE_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/employees/${id}`,
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
        throw new Error("Failed to update employee");
      }

      dispatch({ type: ADD_EMPLOYEE_SUCCESS });
    } catch (error: any) {
      dispatch({ type: ADD_EMPLOYEE_FAILURE, payload: error.message });
    }
  };

export const deleteEmployee =
  (id: string) => async (dispatch: Dispatch<EmployeesActionTypes>) => {
    dispatch({ type: DELETE_EMPLOYEE_REQUEST });
    const token = Cookies.get("access_token");

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/employees/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Failed to delete employee");
      }

      dispatch({ type: DELETE_EMPLOYEE_SUCCESS });
    } catch (error: any) {
      dispatch({ type: DELETE_EMPLOYEE_FAILURE, payload: error.message });
    }
  };

export const fetchDrivers = () => {
  return async (dispatch: Dispatch<EmployeesActionTypes>) => {
    dispatch({ type: FETCH_DRIVERS_REQUEST });
    const token = Cookies.get("access_token");
    console.log("Access Token:", token);
    if (!token) {
      dispatch({
        type: FETCH_DRIVERS_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/employees/drivers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: FETCH_DRIVERS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_DRIVERS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const fetchConductors = () => {
  return async (dispatch: Dispatch<EmployeesActionTypes>) => {
    dispatch({ type: FETCH_CONDUCTORS_REQUEST });
    const token = Cookies.get("access_token");
    console.log("Access Token:", token);
    if (!token) {
      dispatch({
        type: FETCH_CONDUCTORS_FAILURE,
        payload: "Access token not found",
      });
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/employees/conductors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: FETCH_CONDUCTORS_SUCCESS,
        payload: response.data,
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_CONDUCTORS_FAILURE,
        payload: error.message,
      });
    }
  };
};
