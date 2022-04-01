import classes from "./PatientsList.module.css";

import Patient from "./Patient";

const PatientsList = (props) => {
  return (
    <ul className={classes["patient-list"]}>
      {props.patients.map((patient) => (
        <Patient
          key={patient._id}
          id={patient._id}
          image={patient.image}
          name={patient.name}
          age={patient.age}
          status={patient.status}
          report={patient.report}
        />
      ))}
    </ul>
  );
};

export default PatientsList;
