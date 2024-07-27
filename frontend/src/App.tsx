import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCafesRequest,
  addCafeRequest,
  updateCafeRequest,
  deleteCafeRequest,
  fetchEmployeesRequest,
  addEmployeeRequest,
  updateEmployeeRequest,
  deleteEmployeeRequest,
} from "./store/actions";

import "./App.css";

function App() {
  const {cafes,employees} = useSelector((state:{cafes:any,employees:any}) => state);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCafesRequest("singapore"));
    dispatch(fetchEmployeesRequest("cafe1"));
  }, []);

  useEffect(() => {
    console.log("store.cafes", cafes);
  }, [cafes]);

  useEffect(() => {
    console.log("store.employees", employees);
  }, [employees]);

  return (
    <>
      Cafes & Employees
      <button onClick={() => dispatch(fetchCafesRequest("singapore"))}>
        Fetch Cafes
      </button>
      <button
        onClick={() =>
          dispatch(addCafeRequest({ name: "New Cafe", location: "Singapore" }))
        }
      >
        Add Cafe
      </button>
      <button
        onClick={() =>
          dispatch(
            updateCafeRequest(1, {
              cafeId: 1,
              cafeData: { name: "Updated Cafe", location: "Singapore" },
            })
          )
        }
      >
        Update Cafe
      </button>
      <button onClick={() => dispatch(deleteCafeRequest(1))}>
        Delete Cafe
      </button>
      <button onClick={() => dispatch(fetchEmployeesRequest("cafe1"))}>
        Fetch Employees
      </button>
      <button
        onClick={() =>
          dispatch(
            addEmployeeRequest({
              name: "John Doe",
              email: "john.doe@example.com",
              phone: "91234567",
              cafeId: 1,
            })
          )
        }
      >
        Add Employee
      </button>
      <button
        onClick={() =>
          dispatch(
            updateEmployeeRequest(1, {
              employeeId: 1,
              employeeData: {
                name: "Jane Doe",
                email: "jane.doe@example.com",
                phone: "98765432",
              },
            })
          )
        }
      >
        Update Employee
      </button>
      <button onClick={() => dispatch(deleteEmployeeRequest(1))}>
        Delete Employee
      </button>
    </>
  );
}

export default App;
