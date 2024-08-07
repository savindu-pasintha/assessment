import styled from 'styled-components';
import { Select } from '@mui/material';

export const SImage = styled.img`
  width: 25px;
  height: 25px;
`;

export const StyledSelect = styled(Select)`
& .MuiOutlinedInput-root {
  & fieldset {
    border-color: black;
  }
  &:hover fieldset {
    border-color: black;
  }
  &.Mui-focused fieldset {
    border-color: black;
  }
}

& .MuiSelect-select {
  cursor: pointer;
}
`;