import {
  FETCH_ALLCAFES_REQUEST,
  FETCH_ALLCAFES_SUCCESS,
  FETCH_ALLCAFES_FAILURE,
  FETCH_CAFES_REQUEST,
  FETCH_CAFES_SUCCESS,
  FETCH_CAFES_FAILURE,
  ADD_CAFE_REQUEST,
  ADD_CAFE_SUCCESS,
  ADD_CAFE_FAILURE,
  UPDATE_CAFE_REQUEST,
  UPDATE_CAFE_SUCCESS,
  UPDATE_CAFE_FAILURE,
  DELETE_CAFE_REQUEST,
  DELETE_CAFE_SUCCESS,
  DELETE_CAFE_FAILURE,
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


export const fetchAllCafesRequest = (location: any) => ({
  type: FETCH_ALLCAFES_REQUEST,
  payload: location,
});

export const fetchAllCafesSuccess = (data: any) => ({
  type: FETCH_ALLCAFES_SUCCESS,
  payload: data,
});

export const fetchAllCafesFailure = (error: any) => ({
  type: FETCH_ALLCAFES_FAILURE,
  payload: error,
});

export const fetchCafesRequest = (location: any) => ({
  type: FETCH_CAFES_REQUEST,
  payload: location,
});

export const fetchCafesSuccess = (data: any) => ({
  type: FETCH_CAFES_SUCCESS,
  payload: data,
});

export const fetchCafesFailure = (error: any) => ({
  type: FETCH_CAFES_FAILURE,
  payload: error,
});

export const addCafeRequest = (cafeData: any) => ({
  type: ADD_CAFE_REQUEST,
  payload: cafeData,
});

export const addCafeSuccess = (data: any) => ({
  type: ADD_CAFE_SUCCESS,
  payload: data,
});

export const addCafeFailure = (error: any) => ({
  type: ADD_CAFE_FAILURE,
  payload: error,
});

export const updateCafeRequest = (cafeId: any, cafeData: any) => ({
  type: UPDATE_CAFE_REQUEST,
  payload: { cafeId, cafeData },
});

export const updateCafeSuccess = (data: any) => ({
  type: UPDATE_CAFE_SUCCESS,
  payload: data,
});

export const updateCafeFailure = (error: any) => ({
  type: UPDATE_CAFE_FAILURE,
  payload: error,
});

export const deleteCafeRequest = (cafeId: any) => ({
  type: DELETE_CAFE_REQUEST,
  payload: cafeId,
});

export const deleteCafeSuccess = (data: any) => ({
  type: DELETE_CAFE_SUCCESS,
  payload: data,
});

export const deleteCafeFailure = (error: any) => ({
  type: DELETE_CAFE_FAILURE,
  payload: error,
});

export const fetchEmployeesRequest = (cafe: any) => ({
  type: FETCH_EMPLOYEES_REQUEST,
  payload: cafe,
});

export const fetchEmployeesSuccess = (data: any) => ({
  type: FETCH_EMPLOYEES_SUCCESS,
  payload: data,
});

export const fetchEmployeesFailure = (error: any) => ({
  type: FETCH_EMPLOYEES_FAILURE,
  payload: error,
});

export const addEmployeeRequest = (employeeData: any) => ({
  type: ADD_EMPLOYEE_REQUEST,
  payload: employeeData,
});

export const addEmployeeSuccess = (data: any) => ({
  type: ADD_EMPLOYEE_SUCCESS,
  payload: data,
});

export const addEmployeeFailure = (error: any) => ({
  type: ADD_EMPLOYEE_FAILURE,
  payload: error,
});

export const updateEmployeeRequest = (employeeId: any, employeeData: any) => ({
  type: UPDATE_EMPLOYEE_REQUEST,
  payload: { employeeId, employeeData },
});

export const updateEmployeeSuccess = (data: any) => ({
  type: UPDATE_EMPLOYEE_SUCCESS,
  payload: data,
});

export const updateEmployeeFailure = (error: any) => ({
  type: UPDATE_EMPLOYEE_FAILURE,
  payload: error,
});

export const deleteEmployeeRequest = (employeeId: any) => ({
  type: DELETE_EMPLOYEE_REQUEST,
  payload: employeeId,
});

export const deleteEmployeeSuccess = (data: any) => ({
  type: DELETE_EMPLOYEE_SUCCESS,
  payload: data,
});

export const deleteEmployeeFailure = (error: any) => ({
  type: DELETE_EMPLOYEE_FAILURE,
  payload: error,
});
