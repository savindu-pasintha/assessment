import React from "react";
import { MenuItem, FormControl,InputLabel } from "@mui/material";
import {StyledSelect} from '../StyledComponents/index'




const Selector = (props: any) => {
  const { cafes, type, handleInputChange, value,title } = props;
  return (
    <FormControl sx={{ m: 1, minWidth: 300 }} fullWidth>
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <StyledSelect
        labelId="demo-simple-select-label"
        name={type}
        value={value}
        onChange={handleInputChange}
        fullWidth
        variant="outlined"
      >
        {cafes && cafes.length == 0 && <MenuItem value="">None</MenuItem>}
        {cafes.map((cafe: any) => (
          <MenuItem key={cafe.id} value={cafe[type]}>
            {cafe[type]}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default Selector;
