import { combineReducers } from 'redux';
import cafeReducer from './CafeReducer';
import employeeReducer from './EmployeeReducer';

const rootReducer = combineReducers({
  cafes: cafeReducer,
  employees: employeeReducer
});

export default rootReducer;
