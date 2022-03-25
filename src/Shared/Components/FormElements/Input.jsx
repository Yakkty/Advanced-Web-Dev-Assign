import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={`${classes["form-control"]}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} type={props.type} required minLength="1" onChange={props.onChange} />
    </div>
  );
};

export default Input;
