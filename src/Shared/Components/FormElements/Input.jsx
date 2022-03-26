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
      />
    ) : (
      <textarea
        id={props.id}
        type={props.type}
        required
        minLength="1"
        onChange={props.onChange}
        rows={props.rows || 3}
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
