export const FETCH_SEARCHED_BUSES_REQUEST = "FETCh_SEARCHED_BUSES_REQUEST";
export const FETCH_SEARCHED_BUSES_SUCCESS = "FETCh_SEARCHED_BUSES_SUCCESS";
export const FETCH_SEARCHED_BUSES_FAILURE = "FETCh_SEARCHED_BUSES_FAILURE";
export const FETCH_SEATS_FOR_TRIP_REQUEST = "FETCh_SEATS_FOR_TRIP_REQUEST";
export const FETCH_SEATS_FOR_TRIP_SUCCESS = "FETCh_SEATS_FOR_TRIP_SUCCESS";
export const FETCH_SEATS_FOR_TRIP_FAILURE = "FETCh_SEATS_FOR_TRIP_FAILURE";
export const POST_BOOKING_SEATS_FOR_TRIP_REQUEST =
  "POST_BOOKING_SEATS_FOR_TRIP_REQUEST";
export const POST_BOOKING_SEATS_FOR_TRIP_SUCCESS =
  "POST_BOOKING_SEATS_FOR_TRIP_SUCCESS";
export const POST_BOOKING_SEATS_FOR_TRIP_FAILURE =
  "POST_BOOKING_SEATS_FOR_TRIP_FAILURE";
export const CLEAR_SEARCHED_BUSES = "CLEAR_SEARCHED_BUSES";
export const CLEAR_SEATS_FOR_TRIP = "CLEAR_SEATS_FOR_TRIP";

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

export type BusesActionTypes =
  | FetchSearchedBusesRequestAction
  | FetchSearchedBusesSuccessAction
  | FetchSearchedBusesFailureAction
  | FetchSeatsForTripRequestAction
  | FetchSeatsForTripSuccessAction
  | FetchSeatsForTripFailureAction
  | ClearSearchedBuses
  | ClearSeatsForTrip
  | PostBookingSeatsForTripRequestAction
  | PostBookingSeatsForTripSuccessAction
  | PostBookingSeatsForTripFailureAction;

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

    default:
      return state;
  }
};

export default busesReducer;
