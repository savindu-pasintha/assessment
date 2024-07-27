import { TextField } from '@mui/material'
import React from 'react'

const Form = (props) => {
    const { type, } = props
  return (
    <>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
    </>
  )
}

export default Form