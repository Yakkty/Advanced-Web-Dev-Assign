//This page is the parent component for displaying all information regarding patients

//imports
import { Fragment, useState, useEffect } from "react";

import Card from "../../Shared/Components/UIElements/Card";
import PatientsList from "../components/PatientsList";
import NewPatients from "./NewPatients";
import Button from "../../Shared/Components/FormElements/Button";
import { useHttp } from "../../Shared/Components/hooks/http-hook";

import classes from "./PatientsPage.module.css";

const PatientsPage = () => {
  //State to store patient information
  const [patientInfo, setPatientData] = useState();
  //Helper state for managing whether to show the patients or the form for adding a new patient
  const [showPatients, setShowPatients] = useState(true);
  //Get access sendrequest method from our custom usehttp hook
  const { sendRequest } = useHttp();

  //Useeffect call to request patient data from the database and display it in the patients page
  //This is asynchronous as http requests are typically asynchronous
  //This call will only happen on initial page render and if sendrequest or setPatientdata changes
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/patients"
        );

        //Store data accessed from the request into state
        setPatientData(responseData.patients);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPatients();
  }, [sendRequest, setPatientData]);

  //This handler function is to add patients to the pre existing patient data state
  //This is dependent on the previous data snapshot, which we gain access to from ...prevData
  const addPatientHandler = (patientData) => {
    setPatientData((prevData) => {
      return [...prevData, patientData];
    });
    console.log(patientData);
  };

  //Helper functions to display either the patient data or the add patient form
  const showPatientListHandler = () => {
    setShowPatients(true);
  };

  const hidePatientListHandler = () => {
    setShowPatients(false);
  };

  //Function for removing patients from the patient data state
  //This function only affects what is seen on the front end
  //This function sets the patient data to include every patient where the id does not match the id of the deleted patient
  const patientDeletedHandler = (deletedPatientId) => {
    setPatientData((prevPatients) =>
      prevPatients.filter((patient) => patient.id !== deletedPatientId)
    );
  };

  //This is the markup for the patients page, displaying alternating buttons which show the patient data or the add patient form
  //This page will display patient data if it exists, which is achieved by rendering a patient list component
  //The patient data is passed to this patient list via props, along with the delete patient function
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
