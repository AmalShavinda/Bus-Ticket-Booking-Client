export const FETCH_EMPLOYEES_REQUEST = "FETCh_EMPLOYEES_REQUEST";
export const FETCH_EMPLOYEES_SUCCESS = "FETCh_EMPLOYEES_SUCCESS";
export const FETCH_EMPLOYEES_FAILURE = "FETCh_EMPLOYEES_FAILURE";
export const ADD_EMPLOYEE_REQUEST = "ADD_EMPLOYEE_REQUEST";
export const ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS";
export const ADD_EMPLOYEE_FAILURE = "ADD_EMPLOYEE_FAILURE";
export const DELETE_EMPLOYEE_REQUEST = "DELETE_EMPLOYEE_REQUEST";
export const DELETE_EMPLOYEE_SUCCESS = "DELETE_EMPLOYEE_SUCCESS";
export const DELETE_EMPLOYEE_FAILURE = "DELETE_EMPLOYEE_FAILURE";
export const FETCH_DRIVERS_REQUEST = "FETCh_DRIVERS_REQUEST";
export const FETCH_DRIVERS_SUCCESS = "FETCh_DRIVERS_SUCCESS";
export const FETCH_DRIVERS_FAILURE = "FETCh_DRIVERS_FAILURE";
export const FETCH_CONDUCTORS_REQUEST = "FETCh_CONDUCTORS_REQUEST";
export const FETCH_CONDUCTORS_SUCCESS = "FETCh_CONDUCTORS_SUCCESS";
export const FETCH_CONDUCTORS_FAILURE = "FETCh_CONDUCTORS_FAILURE";

interface EmployeeState {
  loading: boolean;
  employees: any[];
  error: string | null;
  drivers: any[];
  conductors: any[];
}

const initialState: EmployeeState = {
  loading: false,
  employees: [],
  error: null,
  drivers: [],
  conductors: [],
};

interface FetchEmployeeRequestAction {
  type: typeof FETCH_EMPLOYEES_REQUEST;
}

interface FetchEmployeeSuccessAction {
  type: typeof FETCH_EMPLOYEES_SUCCESS;
  payload: [];
}

interface FetchEmployeeFailureAction {
  type: typeof FETCH_EMPLOYEES_FAILURE;
  payload: string;
}

interface AddEmployeeRequestAction {
  type: typeof ADD_EMPLOYEE_REQUEST;
}

interface AddEmployeeSuccessAction {
  type: typeof ADD_EMPLOYEE_SUCCESS;
}

interface AddEmployeeFailureAction {
  type: typeof ADD_EMPLOYEE_FAILURE;
  payload: string;
}

interface DeleteEmployeeRequestAction {
  type: typeof DELETE_EMPLOYEE_REQUEST;
}

interface DeleteEmployeeSuccessAction {
  type: typeof DELETE_EMPLOYEE_SUCCESS;
}

interface DeleteEmployeeFailureAction {
  type: typeof DELETE_EMPLOYEE_FAILURE;
  payload: string;
}

interface FetchDriversRequestAction {
  type: typeof FETCH_DRIVERS_REQUEST;
}

interface FetchDriversSuccessAction {
  type: typeof FETCH_DRIVERS_SUCCESS;
  payload: [];
}

interface FetchDriversFailureAction {
  type: typeof FETCH_DRIVERS_FAILURE;
  payload: string;
}

interface FetchConductorsRequestAction {
  type: typeof FETCH_CONDUCTORS_REQUEST;
}

interface FetchConductorsSuccessAction {
  type: typeof FETCH_CONDUCTORS_SUCCESS;
  payload: [];
}

interface FetchConductorsFailureAction {
  type: typeof FETCH_CONDUCTORS_FAILURE;
  payload: string;
}

export type EmployeesActionTypes =
  | FetchEmployeeRequestAction
  | FetchEmployeeSuccessAction
  | FetchEmployeeFailureAction
  | AddEmployeeRequestAction
  | AddEmployeeSuccessAction
  | AddEmployeeFailureAction
  | DeleteEmployeeRequestAction
  | DeleteEmployeeSuccessAction
  | DeleteEmployeeFailureAction
  | FetchDriversRequestAction
  | FetchDriversSuccessAction
  | FetchDriversFailureAction
  | FetchConductorsRequestAction
  | FetchConductorsSuccessAction
  | FetchConductorsFailureAction;

const employeesReducer = (
  state = initialState,
  action: EmployeesActionTypes
): EmployeeState => {
  switch (action.type) {
    case FETCH_EMPLOYEES_REQUEST:
      return { ...state, loading: true };
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload,
      };
    case FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_EMPLOYEE_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_EMPLOYEE_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_DRIVERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_DRIVERS_SUCCESS:
      return {
        ...state,
        loading: false,
        drivers: action.payload,
      };
    case FETCH_DRIVERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_CONDUCTORS_REQUEST:
      return { ...state, loading: true };
    case FETCH_CONDUCTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        conductors: action.payload,
      };
    case FETCH_CONDUCTORS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default employeesReducer;
