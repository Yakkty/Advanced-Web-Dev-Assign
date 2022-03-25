import { NavLink } from "react-router-dom";

import classes from "./NavLinks.module.css";

const NavLinks = () => {
  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/patients" exact>
          Patients
        </NavLink>
      </li>
      <li>
        <NavLink to="/provider" exact>
          Providers
        </NavLink>
      </li>
      <li>
        <NavLink to="/rooms" exact>
          Rooms
        </NavLink>
      </li>

    </ul>
  );
};

export default NavLinks;
