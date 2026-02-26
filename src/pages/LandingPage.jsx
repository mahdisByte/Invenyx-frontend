import React from "react";
import "../styles/LandingPage.css";
import landingImage from "../assets/images/landing.jpg";

const Landing = () => {
  return (
    <div
      className="landing-container"
      style={{ backgroundImage: `url(${landingImage})` }}
    >
      <div className="overlay">
        <div className="hero-content">
          <h1>Inventory Management System</h1>
          <p>
            Manage products, users, and stock efficiently with a modern and
            secure platform.
          </p>

          <div className="hero-buttons">
            <button className="btn primary">Get Started</button>
            <button className="btn secondary">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
