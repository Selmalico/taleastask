import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({isNightMode, onToggle}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <NavLink className="navbar-brand" exact to="/">
          APRICUS
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleDropdownToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isDropdownOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Books
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/authors">
                Authors
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/genres">
                Genres
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="slider-container">
      <FontAwesomeIcon className="fa-icon" icon={faSun} />&nbsp;
      <label className="switch">
        <input type="checkbox" checked={isNightMode} onChange={onToggle} />
        <span className="slider round"></span>
      </label>&nbsp;
      <FontAwesomeIcon className="fa-icon" icon={faMoon} />
    </div>
    </nav>
  );
};

export default Navbar;
