import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="index-box">
        <div className="links-box">
          <Link to="/index">
            <h1 className="header-title">Airport & Flight Tracker</h1>
          </Link>
          <div className="login-link">
            <Link to="/admin">Admin</Link>
          </div>
          <div className="flight-link">
            <Link to="/flights">Flights</Link>
          </div>
          <div className="airport-info">
            <form>
              <label for="Airport">Airport: </label>
              <select name="Airport">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <input type="submit" value="View" />
            </form>
          </div>
        </div>
        <div className="content-box"></div>
      </div>
    </>
  );
};
export default Home;
