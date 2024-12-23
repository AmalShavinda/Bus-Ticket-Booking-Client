import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { ThunkAction, thunk } from "redux-thunk";
import authReducer from "./Auth/AuthReducer";
import employeesReducer from "./Employees/EmployeesReducer";
import busesReducer from "./Buses/BusesReducer";
import usersReducer from "./Users/UserReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  employees: employeesReducer,
  buses: busesReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
