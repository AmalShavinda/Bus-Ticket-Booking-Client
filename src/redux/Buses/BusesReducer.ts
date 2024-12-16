export const FETCH_SEARCHED_BUSES_REQUEST = "FETCh_SEARCHED_BUSES_REQUEST";
export const FETCH_SEARCHED_BUSES_SUCCESS = "FETCh_SEARCHED_BUSES_SUCCESS";
export const FETCH_SEARCHED_BUSES_FAILURE = "FETCh_SEARCHED_BUSES_FAILURE";

interface BusesState {
  loading: boolean;
  searchedBuses: {
    message: string | null;
    data: any[];
  };
  error: string | null;
}

const initialState: BusesState = {
  loading: false,
  searchedBuses: {
    message: null,
    data: [],
  },
  error: null,
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

export type BusesActionTypes =
  | FetchSearchedBusesRequestAction
  | FetchSearchedBusesSuccessAction
  | FetchSearchedBusesFailureAction;

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

    default:
      return state;
  }
};

export default busesReducer;
