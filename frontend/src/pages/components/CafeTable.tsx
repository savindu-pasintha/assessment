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
import CafeForm from "./Forms/CafeForm";
import { useLocation } from 'react-router-dom';


const useQuery = () =>{
  return new URLSearchParams(useLocation().search);
}

const CafeTable = () => {
  const { cafes } = useSelector((state: { cafes: any }) => state.cafes);
  const dispatch = useDispatch();

  const query = useQuery();

  const [clickedCount, setClickedCount] = useState(0);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState<number | string | null >(0);

  const isOpen = useMemo(() => open, [open]);

  const rowData = useMemo(
    () => cafes || [],
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
      { headerName: "Employees", field: "employeeCount", editable: true },
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
    dispatch(fetchCafesRequest(query.get('location')??"singapore"));
  }, [query.get('location')]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            setId(null)
            setOpen(true)
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
          formType="New Cafe"
          FormComponent={<CafeForm 
            cafeData={{}}
            onCancel={()=>{setId(null);setOpen(false)}} 
            onSubmit={(data:any)=>{
              dispatch(addCafeRequest(data));
              setOpen(false);
          }}/>}
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
