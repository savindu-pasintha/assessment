import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import Selector from "./Forms/Selector";
import { useDispatch } from "react-redux";
import { fetchAllCafesRequest } from "../../store/actions";
import { useSelector } from "react-redux";

const Navigation: React.FC = () => {
  const {
    cafes: { allCafes },
  } = useSelector((state: { cafes: any }) => state);
  const dispatch = useDispatch();
  const [v, setV] = useState(allCafes && allCafes[0]?.location);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCafesRequest(""));
  }, []);

  return (
    <AppBar position="static" color="success">
      <Toolbar>
        <Container
          maxWidth="md"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h6">Cafes & Employees</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Button color="inherit">Cafes</Button>
              <Selector
                cafes={allCafes}
                type="location"
                handleInputChange={(e: any) => {
                  const { value } = e.target;
                  setV(value);
                  navigate(`/cafe?location=${value}`);
                }}
                value={v}
              />
            </Box>
            <Box>
              <Button color="inherit">
                Employees
              </Button>
              <Selector
                cafes={allCafes}
                type="name"
                handleInputChange={(e: any) => {
                  const { value } = e.target;
                  setV(value);
                  navigate(`/employee?cafe=${value}`);
                }}
                value={v}
              />
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
