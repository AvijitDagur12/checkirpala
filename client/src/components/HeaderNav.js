import React from "react";
import "./HeaderNav.css";
import { Link } from "react-router-dom";

const HeaderNav = () => {
  return (
    <div className="header-nav">
      <div className="left">
        <Link to="/">
          <img
            src="https://iconape.com/wp-content/files/bt/257232/svg/257232.svg"
            alt="Portal Logo"
            className="logo"
          />
        </Link>
        <Link to="/"><p>আমাদের গ্রাম পঞ্চায়েত</p></Link>
      </div>

      <div className="center">

        <div className="nav-item">
          About
          <div className="dropdown">
            <Link to="/about-panchayat">About Panchayet</Link>
            <Link to="/history">History</Link>
            <Link to="/vision">Vision & Mission</Link>
            <Link to="/team">Team</Link>
            <Link to="/achievements">Achievements</Link>
          </div>
        </div>

        <div className="nav-item">
          Services
          <div className="dropdown">
            <Link to="/birth-certificate">Birth Certificate</Link>
            <Link to="/death-certificate">Death Certificate</Link>
            <Link to="/income-certificate">Income Certificate</Link>
            <Link to="/residence-certificate">Residence Certificate</Link>
            <Link to="/application-status">Application Status</Link>
          </div>
        </div>

        <div className="nav-item">
          Contact
          <div className="dropdown">
            <Link to="/contact">Contact Info</Link>
            <Link to="/office-address">Office Address</Link>
            <Link to="/support">Support</Link>
            <Link to="/grievance">Grievance</Link>
          </div>
        </div>

        <div className="nav-item">
          Survey
          <div className="dropdown">
            <Link to="/village-survey">Village Survey</Link>
            <Link to="/development-survey">Development Survey</Link>
            <Link to="/citizen-feedback">Citizen Feedback</Link>
            <Link to="/public-opinion">Public Opinion</Link>
          </div>
        </div>

      </div>

      <div className="right">
        <Link to="/auth">
          <button className="login-btn">Login / Register</button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderNav;