export const FETCH_BOOKINGS_REQUEST = "FETCH_BOOKINGS_REQUEST";
export const FETCH_BOOKINGS_SUCCESS = "FETCH_BOOKINGS_SUCCESS";
export const FETCH_BOOKINGS_FAILURE = "FETCH_BOOKINGS_FAILURE";
export const FETCH_BOOKINGS_USERID_REQUEST = "FETCH_BOOKINGS_USERID_REQUEST";
export const FETCH_BOOKINGS_USERID_SUCCESS = "FETCH_BOOKINGS_USERID_SUCCESS";
export const FETCH_BOOKINGS_USERID_FAILURE = "FETCH_BOOKINGS_USERID_FAILURE";
export const FETCH_BOOKINGS_BUSID_REQUEST = "FETCH_BOOKINGS_BUSID_REQUEST";
export const FETCH_BOOKINGS_BUSID_SUCCESS = "FETCH_BOOKINGS_BUSID_SUCCESS";
export const FETCH_BOOKINGS_BUSID_FAILURE = "FETCH_BOOKINGS_BUSID_FAILURE";
export const CLEAR_BOOKINGS_BUSID = "CLEAR_BOOKINGS_BUSID";

interface BookingState {
  loading: boolean;
  bookings: any[];
  error: string | null;
  bookingsByUserId: any[];
  bookingsByBusId: any[];
}

const initialState: BookingState = {
  loading: false,
  bookings: [],
  error: null,
  bookingsByUserId: [],
  bookingsByBusId: [],
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

interface FetchBookingsByUserIdRequestAction {
  type: typeof FETCH_BOOKINGS_USERID_REQUEST;
}

interface FetchBookingsByUserIdSuccessAction {
  type: typeof FETCH_BOOKINGS_USERID_SUCCESS;
  payload: any[];
}

interface FetchBookingsByUserIdFailureAction {
  type: typeof FETCH_BOOKINGS_USERID_FAILURE;
  payload: string;
}
interface FetchBookingsByBusIdRequestAction {
  type: typeof FETCH_BOOKINGS_BUSID_REQUEST;
}

interface FetchBookingsByBusIdSuccessAction {
  type: typeof FETCH_BOOKINGS_BUSID_SUCCESS;
  payload: any[];
}

interface FetchBookingsByBusIdFailureAction {
  type: typeof FETCH_BOOKINGS_BUSID_FAILURE;
  payload: string;
}

interface ClearBookingsBusID {
  type: typeof CLEAR_BOOKINGS_BUSID;
}

export type BookingsActionTypes =
  | FetchBookingsRequestAction
  | FetchBookingsSuccessAction
  | FetchBookingsFailureAction
  | FetchBookingsByUserIdRequestAction
  | FetchBookingsByUserIdSuccessAction
  | FetchBookingsByUserIdFailureAction
  | FetchBookingsByBusIdRequestAction
  | FetchBookingsByBusIdSuccessAction
  | FetchBookingsByBusIdFailureAction
  | ClearBookingsBusID;

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

    case FETCH_BOOKINGS_USERID_REQUEST:
      return { ...state, loading: true };
    case FETCH_BOOKINGS_USERID_SUCCESS:
      return {
        ...state,
        loading: false,
        bookingsByUserId: action.payload,
      };
    case FETCH_BOOKINGS_USERID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_BOOKINGS_BUSID_REQUEST:
      return { ...state, loading: true };
    case FETCH_BOOKINGS_BUSID_SUCCESS:
      return {
        ...state,
        loading: false,
        bookingsByBusId: action.payload,
      };
    case FETCH_BOOKINGS_BUSID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case CLEAR_BOOKINGS_BUSID:
            return {
              ...state,
              bookingsByBusId: [],
            };

    default:
      return state;
  }
};

export default bookingsReducer;
