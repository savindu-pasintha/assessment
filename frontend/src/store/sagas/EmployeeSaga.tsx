import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_EMPLOYEES_REQUEST,
  ADD_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_REQUEST,
} from '../ActionTypes';
import {
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  addEmployeeSuccess,
  addEmployeeFailure,
  updateEmployeeSuccess,
  updateEmployeeFailure,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
} from '../actions/index';
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from '../../api/APIs'

function* fetchEmployeesSaga(action: any) {
  try {
    const response = yield call(fetchEmployees, action.payload);
    yield put(fetchEmployeesSuccess(response.data));
  } catch (error) {
    yield put(fetchEmployeesFailure(error));
  }
}

function* addEmployeeSaga(action: any) {
  try {
    const response = yield call(addEmployee, action.payload);
    yield put(addEmployeeSuccess(response.data));
  } catch (error) {
    yield put(addEmployeeFailure(error));
  }
}

function* updateEmployeeSaga(action: any) {
  try {
    const response = yield call(updateEmployee, action.payload.employeeId, action.payload.employeeData);
    yield put(updateEmployeeSuccess(response.data));
  } catch (error) {
    yield put(updateEmployeeFailure(error));
  }
}

function* deleteEmployeeSaga(action: any) {
  try {
    const response = yield call(deleteEmployee, action.payload);
    yield put(deleteEmployeeSuccess(response.data));
  } catch (error) {
    yield put(deleteEmployeeFailure(error));
  }
}

function* employeeSaga() {
    yield takeLatest(FETCH_EMPLOYEES_REQUEST, fetchEmployeesSaga);
    yield takeLatest(ADD_EMPLOYEE_REQUEST, addEmployeeSaga);
    yield takeLatest(UPDATE_EMPLOYEE_REQUEST, updateEmployeeSaga);
    yield takeLatest(DELETE_EMPLOYEE_REQUEST, deleteEmployeeSaga);}

export default employeeSaga;
