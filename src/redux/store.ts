import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { ThunkAction, thunk } from "redux-thunk";
import authReducer from "./Auth/AuthReducer";
import employeesReducer from "./Employees/EmployeesReducer";
import busesReducer from "./Buses/BusesReducer";
import usersReducer from "./Users/UserReducer";
import bookingsReducer from "./Bookings/BookingReducer";
import routesReducer from "./Route/RouteReducer";
import tripsReducer from "./Trips/TripsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  employees: employeesReducer,
  buses: busesReducer,
  users: usersReducer,
  bookings: bookingsReducer,
  routes: routesReducer,
  trips: tripsReducer,
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
