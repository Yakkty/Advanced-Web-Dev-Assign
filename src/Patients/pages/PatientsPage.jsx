import { Fragment, useState, useEffect } from "react";

import Card from "../../Shared/Components/UIElements/Card";
import PatientsList from "../components/PatientsList";
import NewPatients from "./NewPatients";
import Button from "../../Shared/Components/FormElements/Button";
import { useHttp } from "../../Shared/Components/hooks/http-hook";

import classes from "./PatientsPage.module.css";

const PatientsPage = () => {
  const [patientInfo, setPatientData] = useState();
  const [showPatients, setShowPatients] = useState(true);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/patients"
        );

        setPatientData(responseData.patients);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPatients();
  }, [sendRequest]);

  const addPatientHandler = (patientData) => {
    setPatientData((prevData) => {
      return [patientData, ...prevData];
    });
    console.log(patientData);
  };

  const showPatientListHandler = () => {
    setShowPatients(true);
  };

  const hidePatientListHandler = () => {
    setShowPatients(false);
  };

  const patientDeletedHandler = (deletedPatientId) => {
    setPatientData((prevPatients) =>
    prevPatients.filter((patient) => patient.id !== deletedPatientId)
    );
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
      {showPatients && patientInfo && (
        <PatientsList
          patients={patientInfo}
          onDeletePatient={patientDeletedHandler}
        />
      )}
      ;
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
