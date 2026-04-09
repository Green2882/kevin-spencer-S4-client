import {useNavigate, Link} from "react-router-dom";
import { useState, useEffect } from "react";

const Home= () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="index-box">
                <div className="header-links">
                    <Link to="/" style={{
                        color: "black",
                        textDecoration: "none",
                        float: "left"
                    }}>
                        <h1 className="header-title">
                            Airport & Flight Tracker
                        </h1>
                    </Link>
                    <Link to="/login" style={{
                        color: "black",
                        textDecoration: "none",
                        float: "right",
                    }}>
                        <p>
                            Log in
                        </p>
                    </Link>
                    <Link to="/flights" style={{
                        color: "black",
                        textDecoration: "none",
                        float: "right",
                    }}>
                        <p>
                            Flights
                        </p>
                    </Link>

                </div>
            </div>
        </>
    )
}