import React from 'react';
import { TextField } from '@mui/material';

const ReusableTextbox = (props:any) => {
 const { name, label, value, onChange, error, helperText,type,inputProps } = props
  return <TextField
    name={name}
    label={label}
    value={value}
    onChange={onChange}
    error={error}
    helperText={helperText}
    fullWidth
    variant="outlined"
    margin="normal"
    type={type || "text"}
    inputProps={inputProps ? inputProps : {}}
    required={true}
  />
};

export default ReusableTextbox;
