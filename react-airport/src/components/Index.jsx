import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [airport, setAirport] = useState(null);
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const params = new URLSearchParams(location.search);
    const airportId = params.get("airportId");

    if (airportId) {
      fetch(`http://34.229.16.201:8080/api/1.0.0/airports/${airportId}`, {
        headers: {
          Authorization: auth,
        },
      })
        .then((response) => response.json())
        .then((data) => setAirport(data))
        .catch((error) => console.error("Error fetching airport:", error));
    }

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
          {airport && (
            <div className="airport-display">
              <h2>{airport.name}</h2>
              <p>Code: {airport.code}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
