export const FETCH_EMPLOYEES_REQUEST = "FETCh_EMPLOYEES_REQUEST";
export const FETCH_EMPLOYEES_SUCCESS = "FETCh_EMPLOYEES_SUCCESS";
export const FETCH_EMPLOYEES_FAILURE = "FETCh_EMPLOYEES_FAILURE";
export const ADD_EMPLOYEE_REQUEST = "ADD_EMPLOYEE_REQUEST";
export const ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS";
export const ADD_EMPLOYEE_FAILURE = "ADD_EMPLOYEE_FAILURE";

interface EmployeeState {
  loading: boolean;
  employees: any[];
  error: string | null;
}

const initialState: EmployeeState = {
  loading: false,
  employees: [],
  error: null,
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

export type EmployeesActionTypes =
  | FetchEmployeeRequestAction
  | FetchEmployeeSuccessAction
  | FetchEmployeeFailureAction
  | AddEmployeeRequestAction
  | AddEmployeeSuccessAction
  | AddEmployeeFailureAction;

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

    default:
      return state;
  }
};

export default employeesReducer;
