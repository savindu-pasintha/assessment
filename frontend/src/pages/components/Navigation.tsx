import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color='info'>
      <Toolbar>
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            Cafes & Employees
          </Typography>
          <div>
            <Button color="inherit" onClick={() => navigate('/cafe')}>
              Cafes
            </Button>
            <Button color="inherit" onClick={() => navigate('/employee')}>
              Employees
            </Button>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
