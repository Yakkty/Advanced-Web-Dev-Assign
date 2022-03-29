import { Link } from "react-router-dom";

import classes from "./Button.module.css";

const Button = (props) => {
  if (props.href) {
    return (
      <a className={`${classes.button} ${props.className}`} href={props.href}>
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`${classes.button} ${props.className}`}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
