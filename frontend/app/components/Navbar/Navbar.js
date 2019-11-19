import React from "react";
import { NavLink } from "react-router-dom";
import AppContext from "../../context";

import "./navbar.css";

const Navbar = () => {
  return (
    <AppContext.Consumer>
      {({ token, setToken, setUser }) => {
        const logout = () => {
          setToken(null);
          setUser(null);
        };
        return (
          <nav className="main-navbar__container">
            <h1>Events Booking</h1>
            <ul>
              <li>
                <NavLink to="/events">Events</NavLink>
              </li>
              {token && (
                <li>
                  <NavLink to="/bookings">Bookings</NavLink>
                </li>
              )}
              {!token && (
                <li>
                  <NavLink to="/auth">Login / SignUp</NavLink>
                </li>
              )}
              {token && (
                <li onClick={logout}>
                  <NavLink to="/auth">Logout</NavLink>
                </li>
              )}
            </ul>
          </nav>
        );
      }}
    </AppContext.Consumer>
  );
};

export default Navbar;
