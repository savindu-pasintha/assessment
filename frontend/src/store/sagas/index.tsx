import { all } from 'redux-saga/effects';
import cafeSaga from './CafeSaga';
import employeeSaga from './EmployeeSaga';

export default function* rootSaga() {
  yield all([
    cafeSaga(),
    employeeSaga()
  ]);
}
