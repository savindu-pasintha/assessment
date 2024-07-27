import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Box, Container } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SImage } from "./StyledComponents";
import CellActionsRender from "./CellActionsRender";
import AddIcon from "@mui/icons-material/Add";
import {
  fetchCafesRequest,
  addCafeRequest,
  updateCafeRequest,
  deleteCafeRequest,
} from "../../store/actions";
import { AlertDialog } from "./AlertDialog";

const CafeTable = () => {
  const { cafes } = useSelector((state: { cafes: any }) => state.cafes);
  const dispatch = useDispatch();
  const [clickedCount, setClickedCount] = useState(0);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number | string | null >(0);

  const isOpen = useMemo(() => open, [open]);

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

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Logo",
        field: "logo",
        editable: true,
        cellRenderer: (params: any) => <SImage src={params.value} alt="" />,
      },
      { headerName: "Name", field: "name", filter: true, editable: true },
      { headerName: "Description", field: "description", editable: true },
      { headerName: "Employees", field: "employees", editable: true },
      { headerName: "Location", field: "location", editable: true },
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
              dispatch(updateCafeRequest(params?.data?.id, params?.data));
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
  const handleDelete = (id: string|number|null) => {
    id && dispatch(deleteCafeRequest(id));
    setOpen(false);
    setId(null);
  };

  useEffect(() => {
    dispatch(fetchCafesRequest("singapore"));
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            dispatch(
              addCafeRequest({ name: "New Cafe", location: "Singapore" })
            );
          }}
        >
          <AddIcon /> New Cafe
        </Button>
      </Box>
      <Box className="ag-theme-alpine" sx={{ height: 400, width: "100%" }}>
        <AlertDialog
          isOpen={isOpen}
          handleClose={() => setOpen(false)}
          handleDelete={() => handleDelete(id)}
          id={id}
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

export default CafeTable;
