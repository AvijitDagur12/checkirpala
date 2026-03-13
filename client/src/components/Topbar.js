import React, { useState } from "react";
import "./Topbar.css";

const Topbar = ({ toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "topbar dark" : "topbar light"}>
      <div className="topbar-left">
        <button className="mode-btn" onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <a href="/admin">Admin</a>
      </div>
      <span className="portal-text">Panchayet Portal 1.0</span>
    </div>
  );
};

export default Topbar;