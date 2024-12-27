export const FETCH_SEARCHED_BUSES_REQUEST = "FETCh_SEARCHED_BUSES_REQUEST";
export const FETCH_SEARCHED_BUSES_SUCCESS = "FETCh_SEARCHED_BUSES_SUCCESS";
export const FETCH_SEARCHED_BUSES_FAILURE = "FETCh_SEARCHED_BUSES_FAILURE";
export const FETCH_ALL_BUSES_REQUEST = "FETCh_ALL_BUSES_REQUEST";
export const FETCH_ALL_BUSES_SUCCESS = "FETCh_ALL_BUSES_SUCCESS";
export const FETCH_ALL_BUSES_FAILURE = "FETCh_ALL_BUSES_FAILURE";
export const FETCH_SEATS_FOR_TRIP_REQUEST = "FETCh_SEATS_FOR_TRIP_REQUEST";
export const FETCH_SEATS_FOR_TRIP_SUCCESS = "FETCh_SEATS_FOR_TRIP_SUCCESS";
export const FETCH_SEATS_FOR_TRIP_FAILURE = "FETCh_SEATS_FOR_TRIP_FAILURE";
export const POST_BOOKING_SEATS_FOR_TRIP_REQUEST =
  "POST_BOOKING_SEATS_FOR_TRIP_REQUEST";
export const POST_BOOKING_SEATS_FOR_TRIP_SUCCESS =
  "POST_BOOKING_SEATS_FOR_TRIP_SUCCESS";
export const POST_BOOKING_SEATS_FOR_TRIP_FAILURE =
  "POST_BOOKING_SEATS_FOR_TRIP_FAILURE";
export const ADD_BUSES_REQUEST = "ADD_BUSES_REQUEST";
export const ADD_BUSES_SUCCESS = "ADD_BUSES_SUCCESS";
export const ADD_BUSES_FAILURE = "ADD_BUSES_FAILURE";
export const DELETE_BUSES_REQUEST = "DELETE_BUSES_REQUEST";
export const DELETE_BUSES_SUCCESS = "DELETE_BUSES_SUCCESS";
export const DELETE_BUSES_FAILURE = "DELETE_BUSES_FAILURE";
export const CLEAR_SEARCHED_BUSES = "CLEAR_SEARCHED_BUSES";
export const CLEAR_SEATS_FOR_TRIP = "CLEAR_SEATS_FOR_TRIP";
export const FETCH_BUSES_BY_ROUTE_REQUEST = "FETCh_BUSES_BY_ROUTE_REQUEST";
export const FETCH_BUSES_BY_ROUTE_SUCCESS = "FETCh_BUSES_BY_ROUTE_SUCCESS";
export const FETCH_BUSES_BY_ROUTE_FAILURE = "FETCh_BUSES_BY_ROUTE_FAILURE";
export const CLEAR_BUSES_BY_ROUTE = "CLEAR_BUSES_BY_ROUTE";

interface BusesState {
  loading: boolean;
  searchedBuses: {
    message: string | null;
    data: any[];
  };
  error: string | null;
  seats: {
    message: string | null;
    data: {
      busId: string;
      tripId: string;
      routeId: string;
      tripDate: string;
      price: number;
      seats: any[];
    };
  };
  buses: any[];
  bussesByRoute: any[];
  postSuccess: boolean;
}

const initialState: BusesState = {
  loading: false,
  searchedBuses: {
    message: null,
    data: [],
  },
  error: null,
  seats: {
    message: null,
    data: {
      busId: "",
      tripId: "",
      routeId: "",
      tripDate: "",
      price: 0,
      seats: [],
    },
  },
  buses: [],
  bussesByRoute: [],
  postSuccess: false,
};

interface FetchSearchedBusesRequestAction {
  type: typeof FETCH_SEARCHED_BUSES_REQUEST;
}

interface FetchSearchedBusesSuccessAction {
  type: typeof FETCH_SEARCHED_BUSES_SUCCESS;
  payload: {
    message: null;
    data: any[];
  };
}

interface FetchSearchedBusesFailureAction {
  type: typeof FETCH_SEARCHED_BUSES_FAILURE;
  payload: string;
}

interface FetchAllBusesRequestAction {
  type: typeof FETCH_ALL_BUSES_REQUEST;
}

interface FetchAllBusesSuccessAction {
  type: typeof FETCH_ALL_BUSES_SUCCESS;
  payload: any[];
}

interface FetchAllBusesFailureAction {
  type: typeof FETCH_ALL_BUSES_FAILURE;
  payload: string;
}

interface FetchSeatsForTripRequestAction {
  type: typeof FETCH_SEATS_FOR_TRIP_REQUEST;
}

interface FetchSeatsForTripSuccessAction {
  type: typeof FETCH_SEATS_FOR_TRIP_SUCCESS;
  payload: {
    message: null;
    data: {
      busId: "";
      tripId: "";
      routeId: "";
      tripDate: "";
      price: 0;
      seats: any[];
    };
  };
}

interface FetchSeatsForTripFailureAction {
  type: typeof FETCH_SEATS_FOR_TRIP_FAILURE;
  payload: string;
}

interface PostBookingSeatsForTripRequestAction {
  type: typeof POST_BOOKING_SEATS_FOR_TRIP_REQUEST;
}

interface PostBookingSeatsForTripSuccessAction {
  type: typeof POST_BOOKING_SEATS_FOR_TRIP_SUCCESS;
}

interface PostBookingSeatsForTripFailureAction {
  type: typeof POST_BOOKING_SEATS_FOR_TRIP_FAILURE;
  payload: string;
}

interface ClearSearchedBuses {
  type: typeof CLEAR_SEARCHED_BUSES;
}

interface ClearSeatsForTrip {
  type: typeof CLEAR_SEATS_FOR_TRIP;
}

interface AddBusesRequestAction {
  type: typeof ADD_BUSES_REQUEST;
}

interface AddBusesSuccessAction {
  type: typeof ADD_BUSES_SUCCESS;
}

interface AddBusesFailureAction {
  type: typeof ADD_BUSES_FAILURE;
  payload: string;
}

interface DeleteBusesRequestAction {
  type: typeof DELETE_BUSES_REQUEST;
}

interface DeleteBusesSuccessAction {
  type: typeof DELETE_BUSES_SUCCESS;
}

interface DeleteBusesFailureAction {
  type: typeof DELETE_BUSES_FAILURE;
  payload: string;
}

interface FetchBusesByRouteRequestAction {
  type: typeof FETCH_BUSES_BY_ROUTE_REQUEST;
}

interface FetchBusesByRouteSuccessAction {
  type: typeof FETCH_BUSES_BY_ROUTE_SUCCESS;
  payload: any[];
}

interface FetchBusesByRouteFailureAction {
  type: typeof FETCH_BUSES_BY_ROUTE_FAILURE;
  payload: string;
}

interface ClearBusesByRoute {
  type: typeof CLEAR_BUSES_BY_ROUTE;
}

export type BusesActionTypes =
  | FetchSearchedBusesRequestAction
  | FetchSearchedBusesSuccessAction
  | FetchSearchedBusesFailureAction
  | FetchAllBusesRequestAction
  | FetchAllBusesSuccessAction
  | FetchAllBusesFailureAction
  | FetchSeatsForTripRequestAction
  | FetchSeatsForTripSuccessAction
  | FetchSeatsForTripFailureAction
  | ClearSearchedBuses
  | ClearSeatsForTrip
  | PostBookingSeatsForTripRequestAction
  | PostBookingSeatsForTripSuccessAction
  | PostBookingSeatsForTripFailureAction
  | AddBusesRequestAction
  | AddBusesSuccessAction
  | AddBusesFailureAction
  | DeleteBusesRequestAction
  | DeleteBusesSuccessAction
  | DeleteBusesFailureAction
  | FetchBusesByRouteRequestAction
  | FetchBusesByRouteSuccessAction
  | FetchBusesByRouteFailureAction
  | ClearBusesByRoute;

const busesReducer = (
  state = initialState,
  action: BusesActionTypes
): BusesState => {
  switch (action.type) {
    case FETCH_SEARCHED_BUSES_REQUEST:
      return { ...state, loading: true };
    case FETCH_SEARCHED_BUSES_SUCCESS:
      return {
        ...state,
        loading: false,
        searchedBuses: {
          message: action.payload.message,
          data: action.payload.data,
        },
      };
    case FETCH_SEARCHED_BUSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_ALL_BUSES_REQUEST:
      return { ...state, loading: true };
    case FETCH_ALL_BUSES_SUCCESS:
      return {
        ...state,
        loading: false,
        buses: action.payload,
      };
    case FETCH_ALL_BUSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_SEATS_FOR_TRIP_REQUEST:
      return { ...state, loading: true };
    case FETCH_SEATS_FOR_TRIP_SUCCESS:
      return {
        ...state,
        loading: false,
        seats: {
          message: action.payload.message,
          data: {
            busId: action.payload.data.busId,
            tripId: action.payload.data.tripId,
            routeId: action.payload.data.routeId,
            tripDate: action.payload.data.tripDate,
            price: action.payload.data.price,
            seats: action.payload.data.seats,
          },
        },
      };
    case FETCH_SEATS_FOR_TRIP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_SEARCHED_BUSES:
      return {
        ...state,
        searchedBuses: {
          message: null,
          data: [],
        },
      };

    case CLEAR_SEATS_FOR_TRIP:
      return {
        ...state,
        seats: {
          message: null,
          data: {
            busId: "",
            tripId: "",
            routeId: "",
            tripDate: "",
            price: 0,
            seats: [],
          },
        },
      };

    case POST_BOOKING_SEATS_FOR_TRIP_REQUEST:
      return { ...state, loading: true, error: null, postSuccess: true };
    case POST_BOOKING_SEATS_FOR_TRIP_SUCCESS:
      return {
        ...state,
        loading: false,
        postSuccess: false,
      };
    case POST_BOOKING_SEATS_FOR_TRIP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        postSuccess: false,
      };

    case ADD_BUSES_REQUEST:
      return { ...state, loading: true, error: null, postSuccess: true };
    case ADD_BUSES_SUCCESS:
      return {
        ...state,
        loading: false,
        postSuccess: false,
      };
    case ADD_BUSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        postSuccess: false,
      };

    case DELETE_BUSES_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_BUSES_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_BUSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_BUSES_BY_ROUTE_REQUEST:
      return { ...state, loading: true };
    case FETCH_BUSES_BY_ROUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        bussesByRoute: action.payload,
      };
    case FETCH_BUSES_BY_ROUTE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_BUSES_BY_ROUTE:
      return {
        ...state,
        bussesByRoute: [],
      };

    default:
      return state;
  }
};

export default busesReducer;
