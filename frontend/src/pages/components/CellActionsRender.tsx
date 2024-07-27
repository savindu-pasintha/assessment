import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button } from "@mui/material";

const CellActionsRender = (props:any) => {
    const {  handleEdit, handleSave, handleClear } = props
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
    { false && <Button
        variant="contained"
        color="primary"
        onClick={handleEdit}
        style={{ marginRight: "8px" }}
      >
        <EditIcon />
      </Button>}
      <Button
        variant="contained"
        color="success"
        onClick={handleSave}
        style={{ marginRight: "8px" }}
      >
       <EditIcon />  <SaveIcon />
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={handleClear}
      >
        <ClearIcon />
      </Button>
    </Box>
  );
};

export default CellActionsRender;
