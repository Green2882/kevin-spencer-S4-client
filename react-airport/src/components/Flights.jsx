import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Flights = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    // Fetch flights
    fetch("http://34.229.16.201:8080/api/1.0.0/flights", {
      headers: {
        Authorization: auth,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setFlights(data))
      .catch((error) => console.error("Error fetching flights:", error));

    // Fetch airports
    fetch("http://34.229.16.201:8080/api/1.0.0/airports", {
      headers: {
        Authorization: auth,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setAirports(data))
      .catch((error) => console.error("Error fetching airports:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAirport) {
      navigate(`/index?airportId=${selectedAirport}`);
    }
  };

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
          <div className="admin-link">
            <Link to="/admin">Admin</Link>
          </div>
          <div className="airport-info">
            <form onSubmit={handleSubmit}>
              <select
                name="Airport"
                id="Airport"
                onChange={(e) => setSelectedAirport(e.target.value)}
              >
                <option value="">Select an airport</option>
                {airports.map((airport) => (
                  <option key={airport.id} value={airport.id}>
                    {airport.name}
                  </option>
                ))}
              </select>
              <input type="submit" value="View" />
            </form>
          </div>
        </div>
        <div className="content-box">
          <div className="flight-table">
            <table style={{ width: "800px" }}>
              <tbody>
                <tr>
                  <th>Flight Number</th>
                  <th>Departure Time</th>
                  <th>Flight Details</th>
                  <th>Arrival Time</th>
                </tr>
                {flights.map((flight) => (
                  <tr key={flight.flightNumber}>
                    <td>{flight.flightNumber}</td>
                    <td>{flight.departureTime}</td>
                    <td>
                      {flight.originAirport ? flight.originAirport.name : "N/A"}{" "}
                      -&gt;{" "}
                      {flight.destinationAirport
                        ? flight.destinationAirport.name
                        : "N/A"}
                    </td>
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
