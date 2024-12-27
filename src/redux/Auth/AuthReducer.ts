import { AnyAction } from "redux";
import Cookies from "js-cookie";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

interface AuthState {
  accessToken: string | null;
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: Cookies.get("access_token") || null,
  user: (() => {
    try {
      const user = Cookies.get("user_details");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  })(),
  isAuthenticated: !!Cookies.get("access_token"),
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action: AnyAction): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT:
      return { ...initialState, isAuthenticated: false };
    default:
      return state;
  }
};

export default authReducer;
