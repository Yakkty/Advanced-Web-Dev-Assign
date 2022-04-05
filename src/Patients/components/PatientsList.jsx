//This component is responsible for displaying a list of patients, which is dynamically set
//This is achieved by calling the array.map method on the patient data, and mapping each patient in the array to
//a child element that receives all required data and functions via props

//imports
import classes from "./PatientsList.module.css";

import Patient from "./Patient";

const PatientsList = (props) => {
  return (
    <ul className={classes["patient-list"]}>
      {props.patients.map((patient) => (
        <Patient
          key={patient._id}
          id={patient._id}
          name={patient.name}
          age={patient.age}
          status={patient.status}
          report={patient.report}
          onDelete={props.onDeletePatient}
        />
      ))}
    </ul>
  );
};

export default PatientsList;
