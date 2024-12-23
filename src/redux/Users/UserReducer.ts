export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const ADD_USER_REQUEST = "ADD_USER_REQUEST";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

interface UsersSate {
  loading: boolean;
  users: any[];
  error: string | null;
}

const initialState: UsersSate = {
  loading: false,
  users: [],
  error: null,
};

interface FetchUsersRequestAction {
  type: typeof FETCH_USERS_REQUEST;
}

interface FetchUsersSuccessAction {
  type: typeof FETCH_USERS_SUCCESS;
  payload: [];
}

interface FetchUsersFailureAction {
  type: typeof FETCH_USERS_FAILURE;
  payload: string;
}

interface AddUserRequestAction {
  type: typeof ADD_USER_REQUEST;
}

interface AddUserSuccessAction {
  type: typeof ADD_USER_SUCCESS;
}

interface AddUserFailureAction {
  type: typeof ADD_USER_FAILURE;
  payload: string;
}

interface DeleteUserRequestAction {
  type: typeof DELETE_USER_REQUEST;
}

interface DeleteUserSuccessAction {
  type: typeof DELETE_USER_SUCCESS;
}

interface DeleteUserFailureAction {
  type: typeof DELETE_USER_FAILURE;
  payload: string;
}

export type UsersActionTypes =
  | FetchUsersRequestAction
  | FetchUsersSuccessAction
  | FetchUsersFailureAction
  | AddUserRequestAction
  | AddUserSuccessAction
  | AddUserFailureAction
  | DeleteUserRequestAction
  | DeleteUserSuccessAction
  | DeleteUserFailureAction;

const usersReducer = (
  state = initialState,
  action: UsersActionTypes
): UsersSate => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default usersReducer;
