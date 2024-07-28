import {
    FETCH_EMPLOYEES_REQUEST,
    FETCH_EMPLOYEES_SUCCESS,
    FETCH_EMPLOYEES_FAILURE,
    ADD_EMPLOYEE_REQUEST,
    ADD_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_FAILURE,
    UPDATE_EMPLOYEE_REQUEST,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_FAILURE,
    DELETE_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_FAILURE,
  } from '../ActionTypes';
  
  const initialStateEmployees : {
    employees: any,
    loading: boolean,
    error: any,
} = {
    employees: [],
    loading: false,
    error: null,
  };
  
  const employeesReducer = (state = initialStateEmployees, action: any) => {
    switch (action.type) {
      case FETCH_EMPLOYEES_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_EMPLOYEES_SUCCESS:
        return { ...state, loading: false, employees: action.payload };
      case FETCH_EMPLOYEES_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case ADD_EMPLOYEE_REQUEST:
        return { ...state, loading: true, error: null };
      case ADD_EMPLOYEE_SUCCESS:
        if(action.payload.status){
          return { ...state, loading: false, employees: [...state.employees, action.payload.data] };
        }else{
          return { ...state, loading: false, employees: [...state.employees] };
        }
      case ADD_EMPLOYEE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case UPDATE_EMPLOYEE_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_EMPLOYEE_SUCCESS:
        return {
          ...state,
          loading: false,
          employees: state.employees.map(employee =>
            employee.id === action.payload.data.id ? action.payload : employee
          ),
        };
      case UPDATE_EMPLOYEE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case DELETE_EMPLOYEE_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_EMPLOYEE_SUCCESS:
        return {
          ...state,
          loading: false,
          employees: state.employees.filter(employee => employee.id !== action.payload.data),
        };
      case DELETE_EMPLOYEE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export default employeesReducer
  