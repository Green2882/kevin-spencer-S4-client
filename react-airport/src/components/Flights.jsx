import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Flights = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/flights")
      .then((response) => response.json())
      .then((data) => setFlights(data));
  }, []);

  return (
    <>
      <div className="index-box">
        <div className="links-box">
          <Link to="/index">
            <h1 className="header-title">Airport & Flight Tracker</h1>
          </Link>
          <div className="login-link">
            <Link to="/login">Log out</Link>
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
        <div className="content-box">
          <div className="flight-table">
            <table style={{ width: "798px" }}>
              <tbody>
                <tr>
                  <th>Flight Number</th>
                  <th>Departure Time</th>
                  <th>Flight Location</th>
                  <th>Arrival Time</th>
                </tr>
                {flights.map((flight) => (
                  <tr key={flight.flightNumber}>
                    <td>{flight.flightNumber}</td>
                    <td>{flight.departureTime}</td>
                    <td>{flight.flightLocation}</td>
                    <td>{flight.arrivalTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Flights;