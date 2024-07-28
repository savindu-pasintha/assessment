import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  FormLabel,
} from "@mui/material";
import ReusableTextbox from "./ReusableTextBox";

const EmployeeForm = (props: any) => {
  const { employeeData, cafes, onSubmit, onCancel } = props;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    assignedCafe: "",
    phone_number:"",
    email_address:"",
    cafe:""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employeeData) {
      setFormData(employeeData);
    }
  }, [employeeData]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors: any = {};
    tempErrors.name =
      formData.name.length < 6 || formData.name.length > 10
        ? "Name should be between 6 and 10 characters"
        : "";
    tempErrors.email = /\S+@\S+\.\S+/.test(formData.email)
      ? ""
      : "Email is not valid";
    tempErrors.phone = /^[89]\d{7}$/.test(formData.phone)
      ? ""
      : "Phone number must be 8 digits and start with 8 or 9";
    tempErrors.gender = formData.gender ? "" : "Gender is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      formData.email_address = formData.email;
      formData.phone_number = formData.phone;
      formData.cafe = formData.assignedCafe;
      delete formData?.email;
      delete formData?.phone;
      delete formData?.assignedCafe;     
      onSubmit(formData);
    }
  };

  const warnUnsavedChanges = (event: any) => {
    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      event.returnValue = "";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", warnUnsavedChanges);
    return () => {
      window.removeEventListener("beforeunload", warnUnsavedChanges);
    };
  }, [errors]);

  return (
    <form onSubmit={handleSubmit}>
      <ReusableTextbox
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleInputChange}
        error={!!errors.name}
        helperText={errors.name}
        inputProps={{ pattern: "^[A-Za-z]*$",maxLength:10,minLength:6 }}
      />
      <ReusableTextbox
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleInputChange}
        error={!!errors.email}
        helperText={errors.email}
        type="email"
        inputProps={{ maxLength:25 }}
      />
      <ReusableTextbox
        name="phone"
        label="Phone Number"
        value={formData.phone}
        onChange={handleInputChange}
        error={!!errors.phone}
        helperText={errors.phone}
        type="number"
        inputProps={{ maxLength:8 }}
      />
      <RadioGroup
        name="gender"
        value={formData.gender}
        onChange={handleInputChange}
        row
      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
      </RadioGroup>
      <>
        <FormLabel>Select cafe</FormLabel>
        <Select
          name="assignedCafe"
          value={formData.assignedCafe}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
        >
          {cafes && cafes.length == 0 && <MenuItem value="">None</MenuItem>}
          {cafes.map((cafe: any) => (
            <MenuItem key={cafe.id} value={cafe.id}>
              {cafe.name}
            </MenuItem>
          ))}
        </Select>
      </>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default EmployeeForm;
