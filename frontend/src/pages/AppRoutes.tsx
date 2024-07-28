import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CafePage from './Cafe';
import EmployeePage from './Employee';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="cafe" element={<CafePage />} />
          <Route path="employee" element={<EmployeePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
