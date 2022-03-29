import Card from "../../Shared/Components/UIElements/Card";

import Button from "../../Shared/Components/FormElements/Button";
import Avatar from "../../Shared/Components/UIElements/Avatar";
import classes from "./Patient.module.css";

const Patient = (props) => {
  return (
    <li className={classes.patient}>
      <Card className={classes.patient__content}>
        <div className={classes.patient__}>
          <div className={classes["patient__image"]}>
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className={classes.patient__info}>
            <h2>{props.name}</h2>
            <h3>{props.age}</h3>
            <p>{props.status}</p>
            <a href="https://reactjs.org/logo-og.png">Medical Report</a>
          </div>
          <div className={classes.patient__actions}>
            <Button to={`/patients/${props.id}`}>EDIT</Button>
            <Button>DELETE</Button>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default Patient;
