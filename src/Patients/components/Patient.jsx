import { useContext } from "react";

import Card from "../../Shared/Components/UIElements/Card";

import Button from "../../Shared/Components/FormElements/Button";
import Avatar from "../../Shared/Components/UIElements/Avatar";
import { useHttp } from "../../Shared/Components/hooks/http-hook";
import { AuthContext } from "../../Shared/Components/context/auth-context";

import patient from "../../Assets/patient.jpg";
import classes from "./Patient.module.css";

const Patient = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttp();

  const deletePatientHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/patients/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className={classes.patient}>
      <Card className={classes.patient__content}>
        <div className={classes.patient__}>
          <div className={classes["patient__image"]}>
            <Avatar image={patient} alt={props.name} />
          </div>
          <div className={classes.patient__info}>
            <h2>{props.name}</h2>
            <h3>{props.age}</h3>
            <p>{props.status}</p>
            <a href={`http://localhost:5000/${props.report}`} target="_blank ">
              Medical Report
            </a>
          </div>
          <div className={classes["patient__actions"]}>
            <Button to={`/patients/${props.id}`}>EDIT</Button>
            <Button onClick={deletePatientHandler}>DELETE</Button>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default Patient;
