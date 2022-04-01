import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import Button from "../FormElements/Button";
import classes from "./NavLinks.module.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
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
