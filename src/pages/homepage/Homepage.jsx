import React from "react";
import "./Homepage.scss";
import "./animate.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="home">
        <div class="pic-area">
          <div class="pic-area-text">
            <h2 class="welcome">Welcome to</h2>
            <h1 class="home__name">
              {/* <span class="logo-first">Drip</span> */}
              <span class="logo-last">Coffee Chains Management System</span>
            </h1>
            <h3 class="home__name">Where coffee and comfort come together</h3>

            <button class="btn-login" onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
