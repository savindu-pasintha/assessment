import React, { useState, useEffect } from 'react';
import { Button, Box, TextField } from '@mui/material';
import ReusableTextbox from './ReusableTextBox';

const CafeForm = (props:any) => {
  const { cafeData, onSubmit,onCancel } = props
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: null,
    location: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (cafeData) {
      setFormData(cafeData);
    }
  }, [cafeData]);

  const handleInputChange = (e:any) => {
    const { name, value, files } = e.target;

    if (name === 'logo' && files) {
        console.log(files)
    setFormData({
      ...formData,
      [name]: files[0],
    });
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  };

  const validate = () => {
    let tempErrors:any = {};
    tempErrors.name = formData.name.length < 6 || formData.name.length > 10 ? 'Name should be between 6 and 10 characters' : '';
    tempErrors.description = formData.description.length > 256 ? 'Description should be less than 256 characters' : '';
    tempErrors.logo = formData.logo && formData.logo.size > 2097152 ? 'File size should be less than 2MB' : '';
    tempErrors.location = formData.location ? '' : 'Location is required';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };


  const warnUnsavedChanges = (event:any) => {
    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      event.returnValue = '';
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', warnUnsavedChanges);
    return () => {
      window.removeEventListener('beforeunload', warnUnsavedChanges);
    };
  }, [errors]);

  return (
    <form onSubmit={handleSubmit}>
      <ReusableTextbox
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleInputChange}
        error={!!errors?.name}
        helperText={errors.name}
        inputProps={{ minLength:6,maxLength:10 }}
      />
      <ReusableTextbox
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleInputChange}
        error={!!errors.description}
        helperText={errors.description}
        inputProps={{ maxLength:256 }}
      />
      <TextField
        name="logo"
        type="file"
        onChange={handleInputChange}
        error={!!errors.logo}
        helperText={errors.logo}
        fullWidth
        variant="outlined"
        margin="normal"
        inputProps={{ accept: "image/*" }}
      />
      <ReusableTextbox
        name="location"
        label="Location"
        value={formData.location}
        onChange={handleInputChange}
        error={!!errors.location}
        helperText={errors.location}
      />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </Box>
    </form>
  );
};

export default CafeForm;
