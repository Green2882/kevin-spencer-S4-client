import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [airport, setAirport] = useState(null);
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState("");
  const [departureFlights, setDepartureFlights] = useState([]);
  const [arrivalFlights, setArrivalFlights] = useState([]);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const params = new URLSearchParams(location.search);
    const airportId = params.get("airportId");

    if (airportId) {
      // Fetch airport details
      fetch(`http://34.229.16.201:8080/api/1.0.0/airports/${airportId}`, {
        headers: {
          Authorization: auth,
        },
      })
        .then((response) => response.json())
        .then((data) => setAirport(data))
        .catch((error) => console.error("Error fetching airport:", error));

      // Fetch all flights and then filter
      fetch(`http://34.229.16.201:8080/api/1.0.0/flights`, {
        headers: {
          Authorization: auth,
        },
      })
        .then((response) => response.json())
        .then((flights) => {
          const departures = flights.filter(
            (flight) => flight.originAirport.id === parseInt(airportId),
          );
          const arrivals = flights.filter(
            (flight) => flight.destinationAirport.id === parseInt(airportId),
          );
          setDepartureFlights(departures);
          setArrivalFlights(arrivals);
        })
        .catch((error) => console.error("Error fetching flights:", error));
    }

    // Fetch all airports for the dropdown
    fetch("http://34.229.16.201:8080/api/1.0.0/airports", {
      headers: {
        Authorization: auth,
      },
    })
      .then((response) => response.json())
      .then((data) => setAirports(data))
      .catch((error) => console.error("Error fetching airports:", error));
  }, [location]);

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
            <Link to="/">Logout</Link>
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
                value={selectedAirport}
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
          {airport && (
            <div className="airport-display">
              <h2>{airport.name}</h2>
              <p>Code: {airport.code}</p>
            </div>
          )}
          <div className="flights-container">
            <div className="departures">
              <h3>Departures</h3>

              <table>
                <thead>
                  <tr>
                    <th>Flight Number</th>
                    <th>Destination</th>
                    <th>Departure Time</th>
                  </tr>
                </thead>
                <tbody>
                  {departureFlights.map((flight) => (
                    <tr key={flight.id}>
                      <td>{flight.flightNumber}</td>
                      <td>{flight.destinationAirport.name}</td>
                      <td>{flight.departureTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="arrivals">
              <h3>Arrivals</h3>

              <table>
                <thead>
                  <tr>
                    <th>Flight Number</th>
                    <th>Origin</th>
                    <th>Arrival Time</th>
                  </tr>
                </thead>
                <tbody>
                  {arrivalFlights.map((flight) => (
                    <tr key={flight.id}>
                      <td>{flight.flightNumber}</td>
                      <td>{flight.originAirport.name}</td>
                      <td>{flight.arrivalTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
