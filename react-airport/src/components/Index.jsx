import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="index-box">
        <div className="links-box">
          <Link
            to="/"
            style={{
              color: "black",
              textDecoration: "none",
              float: "left",
            }}
          >
            <h1 className="header-title">Airport & Flight Tracker</h1>
          </Link>
          <div className="login-link">
            <Link to="/login">Log in</Link>
          </div>
          <div className="flight-link">
            <Link to="/flights">Flights</Link>
          </div>
        </div>
        <div className="content-box"></div>
      </div>
    </>
  );
};
export default Home;
