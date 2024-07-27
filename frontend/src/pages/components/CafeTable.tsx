import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Box, Container } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCafesRequest } from "../../store/actions";

const CafeTable = () => {
  const { cafes } = useSelector((state: { cafes: any }) => state.cafes);
  const dispatch = useDispatch();
  const [clickedCount, setClickedCount] = useState(0);

  const rowData = useMemo(
    () =>
      cafes || [
        {
          logo: "logo1.png",
          name: "Cafe 1",
          description: "Description 1",
          employees: 10,
          location: "Location 1",
          actions: "",
        },
        {
          logo: "logo2.png",
          name: "Cafe 2",
          description: "Description 2",
          employees: 20,
          location: "Location 2",
          actions: "",
        },
      ],
    [cafes]
  );

  const [columnDefs] = useState([
    {
      headerName: "Logo",
      field: "logo",
      cellRendererFramework: (params) => <img src={params.value} alt="logo" />,
    },
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    { headerName: "Employees", field: "employees" },
    { headerName: "Location", field: "location" },
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
  ]);

  const handleEdit = (data) => {
    console.log("Edit row:", data);
  };

  const handleDelete = (data) => {
    console.log("Delete row:", data);
  };

  useEffect(() => {
    dispatch(fetchCafesRequest("singapore"));
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
          onClick={() => console.log("Add New Cafe")}
        >
          Add New Cafe
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

export default CafeTable;
