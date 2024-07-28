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
  } from '../ActionTypes';
  
  const initialStateCafes :{
    cafes: any,
    allCafes:any,
    loading: boolean,
    error: any,
  } = {
    cafes: [],
    allCafes:[],
    loading: false,
    error: null,
  };
  
  const cafesReducer = (state = initialStateCafes, action: any) => {
    switch (action.type) {

      case FETCH_ALLCAFES_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_ALLCAFES_SUCCESS:
        return { ...state, loading: false, allCafes: action.payload.data };
      case FETCH_ALLCAFES_FAILURE:
        return { ...state, loading: false, error: action.payload };

      case FETCH_CAFES_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_CAFES_SUCCESS:
        return { ...state, loading: false, cafes: action.payload.data };
      case FETCH_CAFES_FAILURE:
        return { ...state, loading: false, error: action.payload.data };

      case ADD_CAFE_REQUEST:
        return { ...state, loading: true, error: null };
      case ADD_CAFE_SUCCESS:
        if(action.payload.status){
          return { ...state, loading: false, cafes: [...state.cafes, action.payload.data] };
        }else{
          return { ...state, loading: false, cafes: [...state.cafes] };
        }
        
      case ADD_CAFE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case UPDATE_CAFE_REQUEST:
        return { ...state, loading: true, error: null };
      case UPDATE_CAFE_SUCCESS:
        return {
          ...state,
          loading: false,
          cafes: state.cafes.map(cafe =>
            cafe.id === action.payload.data.id ? action.payload.data : cafe
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
          cafes: state.cafes.filter(cafe => cafe.id !== action.payload.data),
        };
      case DELETE_CAFE_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export default cafesReducer
  