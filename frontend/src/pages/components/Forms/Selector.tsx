import React from 'react'
import {
    MenuItem,
    Select,
  } from "@mui/material";

const Selector = (props:any) => {
    const {cafes,type,handleInputChange,value} = props
  return (
    <Select
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
        </Select>
  )
}

export default Selector
