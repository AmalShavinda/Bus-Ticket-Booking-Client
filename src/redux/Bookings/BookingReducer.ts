export const FETCH_BOOKINGS_REQUEST = "FETCH_BOOKINGS_REQUEST";
export const FETCH_BOOKINGS_SUCCESS = "FETCH_BOOKINGS_SUCCESS";
export const FETCH_BOOKINGS_FAILURE = "FETCH_BOOKINGS_FAILURE";

interface BookingState {
  loading: boolean;
  bookings: any[];
  error: string | null;
}

const initialState: BookingState = {
  loading: false,
  bookings: [],
  error: null,
};

interface FetchBookingsRequestAction {
  type: typeof FETCH_BOOKINGS_REQUEST;
}

interface FetchBookingsSuccessAction {
  type: typeof FETCH_BOOKINGS_SUCCESS;
  payload: any[];
}

interface FetchBookingsFailureAction {
  type: typeof FETCH_BOOKINGS_FAILURE;
  payload: string;
}

export type BookingsActionTypes =
  | FetchBookingsRequestAction
  | FetchBookingsSuccessAction
  | FetchBookingsFailureAction;

const bookingsReducer = (
  state = initialState,
  action: BookingsActionTypes
): BookingState => {
  switch (action.type) {
    case FETCH_BOOKINGS_REQUEST:
      return { ...state, loading: true };
    case FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload,
      };
    case FETCH_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default bookingsReducer;
