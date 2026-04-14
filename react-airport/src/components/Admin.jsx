import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("flights");
  const [message, setMessage] = useState("");

  const [airports, setAirports] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const headers = { Authorization: auth };

    fetch("http://54.234.11.162:8080/airports", { headers })
      .then((r) => r.json())
      .then(setAirports)
      .catch(() => {});
    fetch("http://54.234.11.162:8080/airlines", { headers })
      .then((r) => r.json())
      .then(setAirlines)
      .catch(() => {});
    fetch("http://54.234.11.162:8080/aircraft", { headers })
      .then((r) => r.json())
      .then(setAircrafts)
      .catch(() => {});
    fetch("http://54.234.11.162:8080/cities", { headers })
      .then((r) => r.json())
      .then(setCities)
      .catch(() => {});
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = localStorage.getItem("auth");
    let endpoint = `http://54.234.11.162:8080/${activeTab}`;
    if (activeTab === "aircraft")
      endpoint = "http://54.234.11.162:8080/aircraft";

    let body = { ...formData };

    if (activeTab === "flights") {
      body = {
        flightNumber: formData.flightNumber,
        departureTime: formData.departureTime,
        arrivalTime: formData.arrivalTime,
        aircraft: { id: formData.aircraftId },
        originAirport: { id: formData.originAirportId },
        destinationAirport: { id: formData.destinationAirportId },
      };
    } else if (activeTab === "aircraft") {
      body = {
        type: formData.type,
        numOfPassengers: formData.numOfPassengers,
        airline: { id: formData.airlineId },
      };
    } else if (activeTab === "gates") {
      body = {
        gateNumber: formData.gateNumber,
        airport: { id: formData.airportId },
      };
    } else if (activeTab === "airports") {
      body = {
        name: formData.name,
        code: formData.code,
        city: { id: formData.cityId },
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setMessage(`Successfully added ${activeTab.slice(0, -1)}!`);
        setFormData({});
      } else {
        setMessage("Error adding entry. Check console.");
      }
    } catch (error) {
      setMessage("Connection error.");
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case "flights":
        return (
          <form onSubmit={handleSubmit} className="admin-form">
            <h2>
              {" "}
              Add New{" "}
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
            </h2>
            <input
              name="flightNumber"
              placeholder="Flight Number (e.g. AC123)"
              onChange={handleInputChange}
              required
            />
            <input
              name="departureTime"
              type="datetime-local"
              onChange={handleInputChange}
              required
            />
            <input
              name="arrivalTime"
              type="datetime-local"
              onChange={handleInputChange}
              required
            />
            <select name="aircraftId" onChange={handleInputChange} required>
              <option value="">Select Aircraft</option>
              {aircrafts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.type} ({a.airline?.name})
                </option>
              ))}
            </select>
            <select
              name="originAirportId"
              onChange={handleInputChange}
              required
            >
              <option value="">Origin Airport</option>
              {airports.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.code} - {a.name}
                </option>
              ))}
            </select>
            <select
              name="destinationAirportId"
              onChange={handleInputChange}
              required
            >
              <option value="">Destination Airport</option>
              {airports.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.code} - {a.name}
                </option>
              ))}
            </select>
            <button type="submit">Add Flight</button>
          </form>
        );
      case "aircraft":
        return (
          <form onSubmit={handleSubmit} className="admin-form">
            <h2>
              {" "}
              Add New{" "}
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
            </h2>
            <input
              name="type"
              placeholder="Aircraft Type (e.g. Boeing 737)"
              onChange={handleInputChange}
              required
            />
            <input
              name="numOfPassengers"
              placeholder="Capacity"
              onChange={handleInputChange}
              required
            />
            <select name="airlineId" onChange={handleInputChange} required>
              <option value="">Select Airline</option>
              {airlines.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
            <button type="submit">Add Aircraft</button>
          </form>
        );
      case "gates":
        return (
          <form onSubmit={handleSubmit} className="admin-form">
            <h2>
              {" "}
              Add New{" "}
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
            </h2>
            <input
              name="gateNumber"
              placeholder="Gate Number (e.g. A1)"
              onChange={handleInputChange}
              required
            />
            <select name="airportId" onChange={handleInputChange} required>
              <option value="">Select Airport</option>
              {airports.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
            <button type="submit">Add Gate</button>
          </form>
        );
      case "airports":
        return (
          <form onSubmit={handleSubmit} className="admin-form">
            <h2>
              {" "}
              Add New{" "}
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
            </h2>
            <input
              name="name"
              placeholder="Airport Name"
              onChange={handleInputChange}
              required
            />
            <input
              name="code"
              placeholder="Airport Code (e.g. YYZ)"
              onChange={handleInputChange}
              required
            />
            <select name="cityId" onChange={handleInputChange} required>
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}, {c.state}
                </option>
              ))}
            </select>
            <button type="submit">Add Airport</button>
          </form>
        );
      case "airlines":
        return (
          <form onSubmit={handleSubmit} className="admin-form">
            <h2>
              {" "}
              Add New{" "}
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
            </h2>
            <input
              name="name"
              placeholder="Airline Name"
              onChange={handleInputChange}
              required
            />
            <button type="submit">Add Airline</button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="index-box">
      <div className="links-box">
        <Link to="/index">
          <h1 className="header-title">Admin Dashboard</h1>
        </Link>
        <div className="login-link">
          <Link to="/login">Log out</Link>
        </div>
        <div className="flight-link">
          <Link to="/index">Home</Link>
        </div>
      </div>

      <div className="content-box admin-content">
        <div className="admin-topbar">
          <button
            onClick={() => {
              setActiveTab("flights");
              setMessage("");
            }}
            className={`admin-topbar-btn ${
              activeTab === "flights" ? "active" : "inactive"
            }`}
          >
            Flights
          </button>
          <button
            onClick={() => {
              setActiveTab("aircraft");
              setMessage("");
            }}
            className={`admin-topbar-btn ${
              activeTab === "aircraft" ? "active" : "inactive"
            }`}
          >
            Aircraft
          </button>
          <button
            onClick={() => {
              setActiveTab("gates");
              setMessage("");
            }}
            className={`admin-topbar-btn ${
              activeTab === "gates" ? "active" : "inactive"
            }`}
          >
            Gates
          </button>
          <button
            onClick={() => {
              setActiveTab("airports");
              setMessage("");
            }}
            className={`admin-topbar-btn ${
              activeTab === "airports" ? "active" : "inactive"
            }`}
          >
            Airports
          </button>
          <button
            onClick={() => {
              setActiveTab("airlines");
              setMessage("");
            }}
            className={`admin-topbar-btn ${
              activeTab === "airlines" ? "active" : "inactive"
            }`}
          >
            Airlines
          </button>
        </div>

        <div className="admin-main-area">
          {message && (
            <p
              className={`admin-message ${
                message.includes("Successfully") ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}

          <div className="admin-form-container">{renderForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
