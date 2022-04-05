//This component displays an individual patient to be  displayed in the patients list parent component

//imports
import { useContext } from "react";

import Card from "../../Shared/Components/UIElements/Card";

import Button from "../../Shared/Components/FormElements/Button";
import Avatar from "../../Shared/Components/UIElements/Avatar";
import { useHttp } from "../../Shared/Components/hooks/http-hook";
import { AuthContext } from "../../Shared/Components/context/auth-context";

import patient from "../../Assets/patient.jpg";
import classes from "./Patient.module.css";

//This component displays a list item containing:
//Patient name, age, status and a link to their medical report as a pdf
//This component also has functionality to delete the current patient, and update patient information

const Patient = (props) => {
  //Store the auth context in an auth object
  const auth = useContext(AuthContext);
  //get access to the sendrequest method from our custom useHttp hook
  const { sendRequest } = useHttp();

  //This function is responsible for deleting patients
  //This sends a DELETE request to the backend, passing the specific id as a dynamic paramter to the url
  //The token which is accessed from the auth context is also passed, this prevents unauthorized users from deleting patients
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
      //On delete function from parent function is called here passing the patient id
      props.onDelete(props.id);
    } catch (err) {
      //Log errors
      console.log(err);
    }
  };

  //The delete http request is bound to the OnClick of the delete button
  //The edit button links a user to an update patient form
  //The href of the report is dynamically set, as the actual report is stored in the server
  //whereas the database stores the path to the file
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
