import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const AlertDialog = (props: any) => {
  const { handleDelete, handleClose, isOpen,id , formType , FormComponent } = props;

  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { id && "Are you sure you want to delete this, record ?"}
          {FormComponent && formType && formType}         
       </DialogTitle>
        <DialogContent>
          { id && <DialogContentText id="alert-dialog-description">Id = {id && id} </DialogContentText>}
          {formType && FormComponent}
       </DialogContent>
       { id && <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>}
      </Dialog>
    </React.Fragment>
  );
};
