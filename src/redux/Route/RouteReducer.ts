export const FETCH_ROUTES_REQUEST = "FETCH_ROUTES_REQUEST";
export const FETCH_ROUTES_SUCCESS = "FETCH_ROUTES_SUCCESS";
export const FETCH_ROUTES_FAILURE = "FETCH_ROUTES_FAILURE";
export const ADD_ROUTES_REQUEST = "ADD_ROUTES_REQUEST";
export const ADD_ROUTES_SUCCESS = "ADD_ROUTES_SUCCESS";
export const ADD_ROUTES_FAILURE = "ADD_ROUTES_FAILURE";
export const DELETE_ROUTES_REQUEST = "DELETE_ROUTES_REQUEST";
export const DELETE_ROUTES_SUCCESS = "DELETE_ROUTES_SUCCESS";
export const DELETE_ROUTES_FAILURE = "DELETE_ROUTES_FAILURE";

interface RoutesState {
  loading: boolean;
  routes: any[];
  error: string | null;
}

const initialState: RoutesState = {
  loading: false,
  routes: [],
  error: null,
};

interface FetchRoutesRequestAction {
  type: typeof FETCH_ROUTES_REQUEST;
}

interface FetchRoutesSuccessAction {
  type: typeof FETCH_ROUTES_SUCCESS;
  payload: any[];
}

interface FetchRoutesFailureAction {
  type: typeof FETCH_ROUTES_FAILURE;
  payload: string;
}

interface AddRoutesRequestAction {
  type: typeof ADD_ROUTES_REQUEST;
}

interface AddRoutesSuccessAction {
  type: typeof ADD_ROUTES_SUCCESS;
}

interface AddRoutesFailureAction {
  type: typeof ADD_ROUTES_FAILURE;
  payload: string;
}

interface DeleteRouteRequestAction {
  type: typeof DELETE_ROUTES_REQUEST;
}

interface DeleteRouteSuccessAction {
  type: typeof DELETE_ROUTES_SUCCESS;
}

interface DeleteRouteFailureAction {
  type: typeof DELETE_ROUTES_FAILURE;
  payload: string;
}

export type RoutesActionTypes =
  | FetchRoutesRequestAction
  | FetchRoutesSuccessAction
  | FetchRoutesFailureAction
  | AddRoutesRequestAction
  | AddRoutesSuccessAction
  | AddRoutesFailureAction
  | DeleteRouteRequestAction
  | DeleteRouteSuccessAction
  | DeleteRouteFailureAction;

const routesReducer = (
  state = initialState,
  action: RoutesActionTypes
): RoutesState => {
  switch (action.type) {
    case FETCH_ROUTES_REQUEST:
      return { ...state, loading: true };
    case FETCH_ROUTES_SUCCESS:
      return {
        ...state,
        loading: false,
        routes: action.payload,
      };
    case FETCH_ROUTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_ROUTES_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_ROUTES_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_ROUTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_ROUTES_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_ROUTES_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_ROUTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default routesReducer;
