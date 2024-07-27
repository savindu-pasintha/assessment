import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
      <div>
        <header>
          <Navigation />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <p></p>
        </footer>
      </div>
  );
};

export default Layout;