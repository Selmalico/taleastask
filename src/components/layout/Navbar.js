import React, { useState, useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import "../styles/Navbar.css";
import { Auth } from "aws-amplify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({isNightMode, onToggle}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const history = useHistory();
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const fetchUserData = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
    } catch (error) {
      console.log("Error fetching the user data", error);
    }
  };

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setUser(null);
      history.push("/");
    } catch (error) {
      console.log("Error logging out", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
              <NavLink className="nav-link" exact to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="navbar__right">
          {user && (
            <div className="nav-item">
              <div className="nav-item">
                Welcome, {user.username}
              </div>
              <button className="nav-item button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
          {!user ? (
            <div className="nav-item">
              <NavLink to="/login" className="nav-item">
                Login
              </NavLink>
            </div>
          ) : null}
            <NavLink className="nav-link" exact to="/order">
              Order
            </NavLink>
          </div>
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
