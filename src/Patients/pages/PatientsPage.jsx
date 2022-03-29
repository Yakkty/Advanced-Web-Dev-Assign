import { Fragment, useState } from "react";

import image from "../../Assets/tom.png";
import Card from "../../Shared/Components/UIElements/Card";
import PatientsList from "../components/PatientsList";
import NewPatients from "./NewPatients";
import Button from "../../Shared/Components/FormElements/Button";
import classes from "./PatientsPage.module.css";

const DUMMY_PATIENTS = [
  {
    id: "p1",
    name: "Rafael",
    age: "25",
    gender: "Male",
    status: "Current Patient",
    reports: "test",
    imageUrl: image,
  },
  {
    id: "p2",
    name: "Lisa",
    age: "22",

    status: "Recovered",
    reports: "test",
    imageUrl: image,
  },
  {
    id: "p3",
    name: "Tom",
    age: "19",

    status: "Current Patient",
    reports: "test",
    imageUrl: image,
  },
  {
    id: "p4",
    name: "Tom",
    age: "19",

    status: "Current Patient",
    reports: "test",
    imageUrl: image,
  },
  {
    id: "p5",
    name: "Tom",
    age: "19",

    status: "Current Patient",
    reports: "test",
    imageUrl: image,
  },
  {
    id: "p6",
    name: "Tom",
    age: "19",

    status: "Current Patient",
    reports: "test",
    imageUrl: image,
  },
];

const PatientsPage = () => {
  const [patientInfo, setPatientData] = useState(DUMMY_PATIENTS);
  const [showPatients, setShowPatients] = useState(true);

  const addPatientHandler = (patientData) => {
    setPatientData((prevData) => {
      return [patientData, ...prevData];
    });
    console.log(patientData);
  };

  const showPatientListHandler = (event) => {
    setShowPatients(true);
  };

  const hidePatientListHandler = () => {
    setShowPatients(false);
  };
  return (
    <Fragment>
      <Card className={classes["new-patient"]}>
        <div className={classes["new-patient__actions"]}>
          <h2>Patients</h2>
          {!showPatients && (
            <Button onClick={showPatientListHandler}>
              Show Healthcare Providers
            </Button>
          )}
          {showPatients && (
            <Button onClick={hidePatientListHandler}>Register</Button>
          )}
        </div>
      </Card>
      {showPatients && <PatientsList patients={patientInfo} />};
      {!showPatients && (
        <NewPatients
          onSavePatientData={addPatientHandler}
          onRegister={showPatientListHandler}
        />
      )}
    </Fragment>
  );
};

export default PatientsPage;
