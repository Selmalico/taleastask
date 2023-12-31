import React, { useState, useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import "../styles/Navbar.css";
import { Auth } from "aws-amplify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavbarComponent = ({ isNightMode, onToggle }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // State variable to store user data
  const history = useHistory();
  const fetchUser = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    setUser(userData);
    console.log(userData);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const handleLogout = async () => {
    try {
      await Auth.signOut();
      setUser(null);
      history.push("/login");
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">APRICUS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Books</Nav.Link>
            <Nav.Link href="/authors">Authors</Nav.Link>
            <Nav.Link href="/authors">Genres</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            {user && (
              <NavDropdown
                title={user.attributes.given_name}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/order">Orders</NavDropdown.Item>
                <NavDropdown.Item href="/updateUser">
                  Update Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link
                    onClick={handleLogout}
                    to="/login"
                    className="dropdown-item"
                  >
                    Log out
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            )} 
            {!user ? <Nav.Link href="/login">Login</Nav.Link> : null}
          </Nav>
        </Navbar.Collapse>
        <div className="slider-container">
          <FontAwesomeIcon className="fa-icon" icon={faSun} />
          &nbsp;
          <label className="switch">
            <input type="checkbox" checked={isNightMode} onChange={onToggle} />
            <span className="slider round"></span>
          </label>
          &nbsp;
          <FontAwesomeIcon className="fa-icon" icon={faMoon} />
        </div>
      </Container>
    </Navbar>
  );

  //   return (
  //     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  //       <div className="container">
  //         <NavLink className="navbar-brand" exact to="/">
  //           APRICUS
  //         </NavLink>
  //         <button
  //           className="navbar-toggler"
  //           type="button"
  //           onClick={handleDropdownToggle}
  //         >
  //           <span className="navbar-toggler-icon"></span>
  //         </button>
  //         <div
  //           className={`collapse navbar-collapse ${isDropdownOpen ? "show" : ""}`}
  //         >
  //           <ul className="navbar-nav mr-auto">
  //             <li className="nav-item">
  //               <NavLink className="nav-link" exact to="/">
  //                 Books
  //               </NavLink>
  //             </li>
  //             <li className="nav-item">
  //               <NavLink className="nav-link" exact to="/authors">
  //                 Authors
  //               </NavLink>
  //             </li>
  //             <li className="nav-item">
  //               <NavLink className="nav-link" exact to="/genres">
  //                 Genres
  //               </NavLink>
  //             </li>
  //             <li className="nav-item">
  //               <NavLink className="nav-link" exact to="/contact">
  //                 Contact
  //               </NavLink>
  //             </li>
  //           </ul>

  //           {user && (
  //             <div className="user-dropdown">
  //               <button
  //                 className="btn btn-secondary dropdown-toggle"
  //                 onClick={handleDropdownToggle}
  //               >
  //                 {user.attributes.given_name} {/* Display the user's name */}
  //               </button>
  //               <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
  //                 <Link className="user-dropdown dropdown-item" to="/updateUser">
  //                   Update Profile
  //                 </Link>
  //                 <Link className="dropdown-item" to="/order">
  //                   Orders
  //                 </Link>
  //                 <Link
  //                   onClick={handleLogout}
  //                   to="/login"
  //                   className="dropdown-item"
  //                 >
  //                   Log out
  //                 </Link>
  //               </div>
  //             </div>
  //           )}
  //           {!user ? (
  //             <ul className="navbar-nav">
  //               <li className="nav-item">
  //                 <NavLink className="nav-link" exact to="/login">
  //                   Log In
  //                 </NavLink>
  //               </li>
  //             </ul>
  //           ) : null}
  //         </div>
  //       </div>
  //       <div className="slider-container">
  //         <FontAwesomeIcon className="fa-icon" icon={faSun} />
  //         &nbsp;
  //         <label className="switch">
  //           <input type="checkbox" checked={isNightMode} onChange={onToggle} />
  //           <span className="slider round"></span>
  //         </label>
  //         &nbsp;
  //         <FontAwesomeIcon className="fa-icon" icon={faMoon} />
  //       </div>
  //     </nav>
  //   );
};

export default NavbarComponent;
