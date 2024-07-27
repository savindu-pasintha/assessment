import {
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
  } from '../ActionTypes';
  
  const initialStateCafes :{
    cafes: any,
    loading: boolean,
    error: any,
  } = {
    cafes: [],
    loading: false,
    error: null,
  };
  
  const cafesReducer = (state = initialStateCafes, action: any) => {
    switch (action.type) {
      case FETCH_CAFES_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_CAFES_SUCCESS:
        return { ...state, loading: false, cafes: action.payload };
      case FETCH_CAFES_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case ADD_CAFE_REQUEST:
        return { ...state, loading: true, error: null };
      case ADD_CAFE_SUCCESS:
        return { ...state, loading: false, cafes: [...state.cafes, action.payload] };
      case ADD_CAFE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case UPDATE_CAFE_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_CAFE_SUCCESS:
        return {
          ...state,
          loading: false,
          cafes: state.cafes.map(cafe =>
            cafe.id === action.payload.id ? action.payload : cafe
          ),
        };
      case UPDATE_CAFE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case DELETE_CAFE_REQUEST:
        return { ...state, loading: true, error: null };
      case DELETE_CAFE_SUCCESS:
        return {
          ...state,
          loading: false,
          cafes: state.cafes.filter(cafe => cafe.id !== action.payload.id),
        };
      case DELETE_CAFE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export default cafesReducer
  