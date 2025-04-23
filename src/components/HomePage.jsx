import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container">
      <h1>Users and Languages Management</h1>
      <div className="nav-links">
        <Link to="/users" className="nav-button">
          Manage Users
        </Link>
        <br />
        <Link to="/languages" className="nav-button">
          Manage Languages
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
