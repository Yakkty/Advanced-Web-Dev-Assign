

import classes from "./PatientsList.module.css";

import Patient from "./Patient";

const PatientsList = (props) => {
  return (
    <ul className={classes["patient-list"]}>
      {props.patients.map((patient) => (
        <Patient
          key={patient.id}
          image={patient.imageUrl}
          name={patient.name}
          age={patient.age}
          status={patient.status}
        />
      ))}
    </ul>
  );
};

export default PatientsList;
