//This is a reusable button component

import { Link } from "react-router-dom";

import classes from "./Button.module.css";

//This button accepts props, which can be used to configure the button in components its utilised in
const Button = (props) => {
  //if checks if the button is to accept a href, or a to property
  //Props children displays all content which is a child to this component i.e the button text
  //if the button has an href, return a hyperlink tag
  if (props.href) {
    return (
      <a className={`${classes.button} ${props.className}`} href={props.href}>
        {props.children}
      </a>
    );
  }
  //If the button receives a to prop, return a react router dom Link element
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

  //Return the button, which the type property determines if it is a hyperlink or a Link
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
