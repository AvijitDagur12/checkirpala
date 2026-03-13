import React from "react";
import "./HeaderNav.css";
import { Link } from "react-router-dom"; 
import "./HeaderNav.css";
const HeaderNav = () => {
  return (
    <div className="header-nav">
      <div className="left">
        <a href="/"> <img src="https://iconape.com/wp-content/files/bt/257232/svg/257232.svg" alt="Portal Logo" className="logo" /></a>
        <a href="/"><p>আমাদের গ্রাম পঞ্চায়েত</p></a>
      </div>
      <div className="center">

<div className="nav-item">
About
<div className="dropdown">
<a href="#">About Panchayet</a>
<a href="#">History</a>
<a href="#">Vision & Mission</a>
<a href="#">Team</a>
<a href="#">Achievements</a>
</div>
</div>

<div className="nav-item">
Services
<div className="dropdown">
<a href="#">Birth Certificate</a>
<a href="#">Death Certificate</a>
<a href="#">Income Certificate</a>
<a href="#">Residence Certificate</a>
<a href="#">Application Status</a>
</div>
</div>

<div className="nav-item">
Contact
<div className="dropdown">
<a href="#">Contact Info</a>
<a href="#">Office Address</a>
<a href="#">Support</a>
<a href="#">Grievance</a>
</div>
</div>

<div className="nav-item">
Survey
<div className="dropdown">
<a href="#">Village Survey</a>
<a href="#">Development Survey</a>
<a href="#">Citizen Feedback</a>
<a href="#">Public Opinion</a>
</div>
</div>
      </div>
      <div className="right">
  <Link to="/Auth">
    <button className="login-btn">Login / Register</button>
  </Link>
</div>
    </div>
  );
};

export default HeaderNav;