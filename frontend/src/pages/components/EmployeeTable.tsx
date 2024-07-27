import React, { useState, useEffect, useMemo,useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Box, Container } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchEmployeesRequest } from "../../store/actions";

const EmployeeTable = () => {
  const { employees } = useSelector(
    (state: { employees: any }) => state.employees
  );
  const dispatch = useDispatch();
  const [clickedCount, setClickedCount] = useState(0);


  const rowData = useMemo(
    () =>
      employees || [
        {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "123-456-7890",
          daysWorked: 30,
          cafeName: "Cafe 1",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          phone: "098-765-4321",
          daysWorked: 25,
          cafeName: "Cafe 2",
        },
      ],
    [employees]
  );

  const columnDefs = [
    { headerName: "Employee ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email Address", field: "email_address" },
    { headerName: "Phone Number", field: "phone_number" },
    { headerName: "Days Worked", field: "days_worked" },
    { headerName: "Café Name", field: "cafe" },
    {
      headerName: "Actions",
      field: "actions",
      cellRendererFramework: (params) => (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEdit(params.data)}
            style={{ marginRight: "8px" }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDelete(params.data)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const handleEdit = (data) => {
    console.log("Edit row:", data);
  };

  const handleDelete = (data) => {
    console.log("Delete row:", data);
  };

  useEffect(() => {
    dispatch(fetchEmployeesRequest("cafe1"));
  }, []);
  const onCellClicked = () => setClickedCount((pre) => pre + clickedCount);
  const onFilterOpened = useCallback(() => {
    console.log(`number of clicks is ${clickedCount}`);
  }, [clickedCount]);
  const onCellValueChanged = useCallback(() => {
    console.log(`number of clicks is ${clickedCount}`);
  }, []);
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("Add New Employee")}
        >
          Add New Employee
        </Button>
      </Box>
      <Box className="ag-theme-alpine" sx={{ height: 400, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onCellClicked={onCellClicked}
          onCellValueChanged={onCellValueChanged}
          onFilterOpened={onFilterOpened}
        />
      </Box>
    </Container>
  );
};

export default EmployeeTable;
