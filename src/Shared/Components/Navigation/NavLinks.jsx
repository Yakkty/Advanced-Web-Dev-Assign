//This component is responsible for the navbar links.
//This allows a user to navigate around the website with button clicks instead of manually typing urls

//Imports
import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Button from "../FormElements/Button";
import classes from "./NavLinks.module.css";

//This renders each button on the navbar, and will then link to various urls depending on which button is clicked
const NavLinks = () => {
  //Context is used here to gain access to the users logged in status, and will render different content accordingly
  const auth = useContext(AuthContext);

  //If a user is logged in, every button except login will be displayed
  //If a user is not logged in, they will only have access to the login button
  //Content here is displayed with the logical && operator
  return (
    <ul className={classes["nav-links"]}>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/patients" exact>
            Patients
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/providers" exact>
            Providers
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/rooms" exact>
            Rooms
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth" exact>
            Login
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Button onClick={auth.logout}>Logout</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
