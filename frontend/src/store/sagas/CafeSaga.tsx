import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_ALLCAFES_REQUEST,
  FETCH_CAFES_REQUEST,
  ADD_CAFE_REQUEST,
  UPDATE_CAFE_REQUEST,
  DELETE_CAFE_REQUEST,
} from '../ActionTypes';
import {
  fetchAllCafesSuccess,
  fetchAllCafesFailure,
  fetchCafesSuccess,
  fetchCafesFailure,
  addCafeSuccess,
  addCafeFailure,
  updateCafeSuccess,
  updateCafeFailure,
  deleteCafeSuccess,
  deleteCafeFailure,
} from '../actions/index';
import {
  fetchAllCafes,
  fetchCafes,
  addCafe,
  updateCafe,
  deleteCafe,
} from '../../api/APIs'

function* fetchAllCafesSaga(action: any) {
  try {
    const response = yield call(fetchAllCafes, action.payload);
    yield put(fetchAllCafesSuccess(response.data));
  } catch (error) {
    yield put(fetchAllCafesFailure(error));
  }
}

function* fetchCafesSaga(action: any) {
  try {
    const response = yield call(fetchCafes, action.payload);
    yield put(fetchCafesSuccess(response.data));
  } catch (error) {
    yield put(fetchCafesFailure(error));
  }
}

function* addCafeSaga(action: any) {
  try {
    const response = yield call(addCafe, action.payload);
    yield put(addCafeSuccess(response.data));
  } catch (error) {
    yield put(addCafeFailure(error));
  }
}

function* updateCafeSaga(action: any) {
  try {
    const response = yield call(updateCafe, action.payload.cafeId, action.payload.cafeData);
    yield put(updateCafeSuccess(response.data));
  } catch (error) {
    yield put(updateCafeFailure(error));
  }
}

function* deleteCafeSaga(action: any) {
  try {
    const response = yield call(deleteCafe, action.payload);
    yield put(deleteCafeSuccess(response.data));
  } catch (error) {
    yield put(deleteCafeFailure(error));
  }
}

function* cafeSaga() {
    yield takeLatest(FETCH_ALLCAFES_REQUEST, fetchAllCafesSaga);
    yield takeLatest(FETCH_CAFES_REQUEST, fetchCafesSaga);
    yield takeLatest(ADD_CAFE_REQUEST, addCafeSaga);
    yield takeLatest(UPDATE_CAFE_REQUEST, updateCafeSaga);
    yield takeLatest(DELETE_CAFE_REQUEST, deleteCafeSaga);}

export default cafeSaga;
