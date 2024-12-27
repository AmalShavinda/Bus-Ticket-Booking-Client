export const FETCH_TRIPS_BY_DATE_REQUEST = "FETCH_TRIPS_BY_DATE_REQUEST";
export const FETCH_TRIPS_BY_DATE_SUCCESS = "FETCH_TRIPS_BY_DATE_SUCCESS";
export const FETCH_TRIPS_BY_DATE_FAILURE = "FETCH_TRIPS_BY_DATE_FAILURE";
export const ADD_TRIP_REQUEST = "ADD_TRIP_REQUEST";
export const ADD_TRIP_SUCCESS = "ADD_TRIP_SUCCESS";
export const ADD_TRIP_FAILURE = "ADD_TRIP_FAILURE";
export const CLEAR_TRIPS = "CLEAR_TRIPS";
export const DELETE_TRIP_REQUEST = "DELETE_TRIP_REQUEST";
export const DELETE_TRIP_SUCCESS = "DELETE_TRIP_SUCCESS";
export const DELETE_TRIP_FAILURE = "DELETE_TRIP_FAILURE";

interface TripsState {
  loading: boolean;
  trips: any[];
  error: string | null;
}

const initialState: TripsState = {
  loading: false,
  trips: [],
  error: null,
};

interface FetchTripsByDateRequestAction {
  type: typeof FETCH_TRIPS_BY_DATE_REQUEST;
}

interface FetchTripsByDateSuccessAction {
  type: typeof FETCH_TRIPS_BY_DATE_SUCCESS;
  payload: any[];
}

interface FetchTripsByDateFailureAction {
  type: typeof FETCH_TRIPS_BY_DATE_FAILURE;
  payload: string;
}

interface AddTripRequestAction {
  type: typeof ADD_TRIP_REQUEST;
}

interface AddTripSuccessAction {
  type: typeof ADD_TRIP_SUCCESS;
}

interface AddTripFailureAction {
  type: typeof ADD_TRIP_FAILURE;
  payload: string;
}

interface ClearTrips {
  type: typeof CLEAR_TRIPS;
}

interface DeleteTripsRequestAction {
  type: typeof DELETE_TRIP_REQUEST;
}

interface DeleteTripsSuccessAction {
  type: typeof DELETE_TRIP_SUCCESS;
}

interface DeleteTripsFailureAction {
  type: typeof DELETE_TRIP_FAILURE;
  payload: string;
}

export type TripsActionTypes =
  | FetchTripsByDateRequestAction
  | FetchTripsByDateSuccessAction
  | FetchTripsByDateFailureAction
  | AddTripRequestAction
  | AddTripSuccessAction
  | AddTripFailureAction
  | ClearTrips
  | DeleteTripsRequestAction
  | DeleteTripsSuccessAction
  | DeleteTripsFailureAction;

const tripsReducer = (
  state = initialState,
  action: TripsActionTypes
): TripsState => {
  switch (action.type) {
    case FETCH_TRIPS_BY_DATE_REQUEST:
      return { ...state, loading: true };
    case FETCH_TRIPS_BY_DATE_SUCCESS:
      return {
        ...state,
        loading: false,
        trips: action.payload,
      };
    case FETCH_TRIPS_BY_DATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_TRIP_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_TRIP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_TRIP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_TRIPS:
      return {
        ...state,
        trips: [],
      };

    case DELETE_TRIP_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_TRIP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_TRIP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default tripsReducer;
