//This is a reusable input component to be utilised in forms
//This component displays either an input of type text or a textarea depending on the props it receives
//This input is configurable based on the props it receives

import classes from "./Input.module.css";

const Input = (props) => {
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        required
        minLength="1"
        onChange={props.onChange}
        value={props.value}
      />
    ) : (
      <textarea
        id={props.id}
        type={props.type}
        required
        minLength="1"
        onChange={props.onChange}
        rows={props.rows || 3}
        value={props.value}
      />
    );
  return (
    <div className={`${classes["form-control"]}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
