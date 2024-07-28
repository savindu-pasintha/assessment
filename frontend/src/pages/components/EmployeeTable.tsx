import React, { useState, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Box, Container } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CellActionsRender from "./CellActionsRender";
import AddIcon from "@mui/icons-material/Add";
import {
  fetchEmployeesRequest,
  addEmployeeRequest,
  updateEmployeeRequest,
  deleteEmployeeRequest,
} from "../../store/actions";
import { AlertDialog } from "./AlertDialog";
import EmployeeForm from "./Forms/EmployeeForm";

const EmployeeTable = () => {
  const { employees :{employees},cafes:{cafes} } = useSelector((state: { employees: any,cafes:any }) => state);
  
  const dispatch = useDispatch();

  const [clickedCount, setClickedCount] = useState(0);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | number | null>(0);

  const isOpen = useMemo(() => open, [open]);

  const rowData = useMemo(
    () => employees || [],
    [employees]
  );

  const columnDefs = useMemo(
    () => [
      { headerName: "Employee ID", field: "id" },
      { headerName: "Name", field: "name", editable: true, filter: true },
      { headerName: "Email Address", field: "email_address", editable: true },
      { headerName: "Phone Number", field: "phone_number", editable: true },
      { headerName: "Days Worked", field: "days_worked", editable: true },
      { headerName: "Café Name", field: "cafe", editable: true },
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: (params: any) => (
          <CellActionsRender
            handleClear={() => {
              setId(params?.data?.id);
              setOpen(true);
            }}
            handleSave={() => {
              dispatch(updateEmployeeRequest(params?.data?.id, params?.data));
            }}
            handleEdit={() => {
              console.log("e", params?.data);
            }}
          />
        ),
      },
    ],
    []
  );

  const onCellClicked = () => setClickedCount((pre) => pre + clickedCount);
  const onFilterOpened = useCallback(() => {
    console.log(`number of clicks is ${clickedCount}`);
  }, [clickedCount]);
  const onCellValueChanged = useCallback(() => {
    console.log(`number of clicks is ${clickedCount}`);
  }, []);

  const handleDelete = (id: string | number | null) => {
    id && dispatch(deleteEmployeeRequest(id));
    setOpen(false);
    setId(null);
  };

  useEffect(() => {
    dispatch(fetchEmployeesRequest("cafe1"));
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setId(null);
            setOpen(true);
          }}
        >
          <AddIcon /> New Employee
        </Button>
      </Box>
      <Box className="ag-theme-alpine" sx={{ height: 400, width: "100%" }}>
        <AlertDialog
          isOpen={isOpen}
          handleClose={() => setOpen(false)}
          handleDelete={() => handleDelete(id)}
          id={id}
          formType={"New Employee"}
          FormComponent={
            <EmployeeForm
              employeeData={{}}
              cafes={cafes}
              onSubmit={(data:any) => {
                dispatch(
                  addEmployeeRequest(data)
                );
                setOpen(false);
              }}
              onCancel={()=>setOpen(false)}
            />
          }
        />
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
