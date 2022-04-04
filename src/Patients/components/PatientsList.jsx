import classes from "./PatientsList.module.css";

import Patient from "./Patient";

const PatientsList = (props) => {
  return (
    <ul className={classes["patient-list"]}>
      {props.patients.map((patient) => (
        <Patient
          key={patient._id}
          id={patient._id}
          // image={""}
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
