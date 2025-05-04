import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="container">
      <h1>Welcome to the Users & Language Portal</h1>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/users" className="nav-button">
          Users Page
        </Link>
        <br />
        <Link to="/languages" className="nav-button">
          Languages Page
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
