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

    fetch("http://34.229.16.201:8080/api/1.0.0/airports", { headers })
      .then(async (r) => {
        if (!r.ok) throw new Error(`Airports failed: ${r.status}`);
        return r.json();
      })
      .then(setAirports)
      .catch((err) => console.error(err));

    fetch("http://34.229.16.201:8080/api/1.0.0/airline", { headers })
      .then(async (r) => {
        if (!r.ok) throw new Error(`Airlines failed: ${r.status}`);
        return r.json();
      })
      .then(setAirlines)
      .catch((err) => console.error(err));

    fetch("http://34.229.16.201:8080/api/1.0.0/aircraft", { headers })
      .then(async (r) => {
        if (!r.ok) throw new Error(`Aircraft failed: ${r.status}`);
        return r.json();
      })
      .then(setAircrafts)
      .catch((err) => console.error(err));

    fetch("http://34.229.16.201:8080/api/1.0.0/cities", { headers })
      .then(async (r) => {
        if (!r.ok) throw new Error(`Cities failed: ${r.status}`);
        return r.json();
      })
      .then(setCities)
      .catch((err) => console.error(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = localStorage.getItem("auth");

    let endpoint = `http://34.229.16.201:8080/api/1.0.0/${activeTab}`;
    if (activeTab === "aircraft") {
      endpoint = "http://34.229.16.201:8080/api/1.0.0/aircraft";
    }

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
      const selectedAirline = airlines.find(
        (a) => String(a.id) === String(formData.airlineId),
      );

      body = {
        type: formData.type,
        airlineName:
          selectedAirline?.airlineName || selectedAirline?.name || "",
        numOfPassengers: formData.numOfPassengers,
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
    } else if (activeTab === "airlines") {
      body = {
        name: formData.name,
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
        setMessage(
          `Successfully added ${activeTab === "aircraft" ? "aircraft" : activeTab.slice(0, -1)}!`,
        );
        setFormData({});

        if (activeTab === "aircraft") {
          const refreshed = await fetch(
            "http://34.229.16.201:8080/api/1.0.0/aircraft",
            {
              headers: { Authorization: auth },
            },
          );
          if (refreshed.ok) {
            const data = await refreshed.json();
            setAircrafts(data);
          }
        }
      } else {
        const errorText = await response.text();
        console.error("POST failed:", response.status, errorText);
        setMessage(`Error adding entry: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Connection error.");
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case "flights":
        return (
          <form onSubmit={handleSubmit} className="admin-form">
            <h2>Add New Flight</h2>
            <input
              name="flightNumber"
              placeholder="Flight Number"
              onChange={handleInputChange}
              value={formData.flightNumber || ""}
              required
            />
            <input
              name="departureTime"
              type="datetime-local"
              onChange={handleInputChange}
              value={formData.departureTime || ""}
              required
            />
            <input
              name="arrivalTime"
              type="datetime-local"
              onChange={handleInputChange}
              value={formData.arrivalTime || ""}
              required
            />

            <select
              name="aircraftId"
              onChange={handleInputChange}
              value={formData.aircraftId || ""}
              required
            >
              <option value="">Select Aircraft</option>
              {aircrafts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.type} (
                  {a.airlineName || a.airline?.airlineName || a.airline?.name})
                </option>
              ))}
            </select>

            <select
              name="originAirportId"
              onChange={handleInputChange}
              value={formData.originAirportId || ""}
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
              value={formData.destinationAirportId || ""}
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
            <h2>Add New Aircraft</h2>
            <input
              name="type"
              placeholder="Aircraft Type"
              onChange={handleInputChange}
              value={formData.type || ""}
              required
            />
            <input
              name="numOfPassengers"
              placeholder="Capacity"
              onChange={handleInputChange}
              value={formData.numOfPassengers || ""}
              required
            />

            <select
              name="airlineId"
              onChange={handleInputChange}
              value={formData.airlineId || ""}
              required
            >
              <option value="">Select Airline</option>
              {airlines.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.airlineName || a.name}
                </option>
              ))}
            </select>

            <button type="submit">Add Aircraft</button>
          </form>
        );

      case "gates":
        return (
          <form onSubmit={handleSubmit} className="admin-form">
            <h2>Add New Gate</h2>
            <input
              name="gateNumber"
              placeholder="Gate Number"
              onChange={handleInputChange}
              value={formData.gateNumber || ""}
              required
            />

            <select
              name="airportId"
              onChange={handleInputChange}
              value={formData.airportId || ""}
              required
            >
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
            <h2>Add New Airport</h2>
            <input
              name="name"
              placeholder="Airport Name"
              onChange={handleInputChange}
              value={formData.name || ""}
              required
            />
            <input
              name="code"
              placeholder="Airport Code"
              onChange={handleInputChange}
              value={formData.code || ""}
              required
            />

            <select
              name="cityId"
              onChange={handleInputChange}
              value={formData.cityId || ""}
              required
            >
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
            <h2>Add New Airline</h2>
            <input
              name="name"
              placeholder="Airline Name"
              onChange={handleInputChange}
              value={formData.name || ""}
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
          {["flights", "aircraft", "gates", "airports", "airlines"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMessage("");
                  setFormData({});
                }}
                className={`admin-topbar-btn ${activeTab === tab ? "active" : "inactive"}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ),
          )}
        </div>

        <div className="admin-main-area">
          {message && (
            <p
              className={`admin-message ${message.includes("Successfully") ? "success" : "error"}`}
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
