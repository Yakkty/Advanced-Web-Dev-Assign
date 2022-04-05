//This component is responsible for updating provider data

//imports
import { useState, useEffect, useContext, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import { useHttp } from "../../Shared/Components/hooks/http-hook";
import { AuthContext } from "../../Shared/Components/context/auth-context";

import classes from "./PatientForm.module.css";

//This component renders a form to then update patient data with.
//This component sends a GET request to display existing data from the database
//Along with sending a patch request to update the patient data
const UpdatePatient = () => {
  //get access to auth context
  const auth = useContext(AuthContext);
  //get access to the send request method from our custom usehttp hook
  const { sendRequest } = useHttp();
  //usestate calls for patient data
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    status: "",
  });

  //get patient id from url parameters and access to the history object from usehistory (so we can redirect users)
  const history = useHistory();
  const patientId = useParams().patientId;

  //Use effect call to populate the form with existing patient data
  //This is a http GET request with a dynamically set url, which gets passed the patient id as a parameter,
  //this ensures the correct patient data is displayed
  //This use effect call renders on page load and whenever its dependancies change
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/patients/${patientId}`
        );
        setPatientData({
          name: responseData.patient.name,
          age: responseData.patient.age,
          status: responseData.patient.status,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchPatient();
  }, [sendRequest, patientId, setPatientData]);

  //If no patient data render a header
  if (!patientData) {
    return (
      <div className="center">
        <h2>Could not find patient</h2>
      </div>
    );
  }

  //handler functions to store user input into state
  const updateNameHandler = (event) => {
    setPatientData({
      ...patientData,
      name: event.target.value,
    });
  };

  const updateAgeHandler = (event) => {
    setPatientData({
      ...patientData,
      age: event.target.value,
    });
  };

  const updateStatusHandler = (event) => {
    setPatientData({
      ...patientData,
      status: event.target.value,
    });
  };

  //Handler function for form submission
  //async as http requests are asynchronous
  const patientSubmitHandler = async (event) => {
    //Event prevent default to prevent page reload
    event.preventDefault();

    //try catch as these http requests can fail
    try {
      //send PATCH request to the same url as the GET request prior,
      //providing the provider data values, which are JSON stringified to convert them into JSON
      await sendRequest(
        `http://localhost:5000/api/patients/${patientId}`,
        "PATCH",
        JSON.stringify({
          name: patientData.name,
          age: patientData.age,
          status: patientData.status,
        }),
        //Content headers to JSON as the backend expects json
        //Auth token provided, no token would prevent this request from completing
        //This is to prevent unauthorized users from sending http requests to the backend
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      //redirect user to /patients
      history.push("/patients");
    } catch (err) {
      console.log(err);
    }
  };
  //Form for retrieving user inputs, storing them in state and calling the function to send the http patch request
  //This form is only rendered if there is patient data
  return (
    <Fragment>
      {patientData && (
        <form
          className={classes["patient-form"]}
          onSubmit={patientSubmitHandler}
        >
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            onChange={updateNameHandler}
            value={patientData.name}
          />
          <Input
            id="age"
            element="input"
            type="number"
            label="Age"
            onChange={updateAgeHandler}
            value={patientData.age}
          />
          <Input
            id="status"
            element="input"
            label="Patient Status"
            onChange={updateStatusHandler}
            value={patientData.status}
          />
          <Button type="submit">UPDATE</Button>
        </form>
      )}
    </Fragment>
  );
};

export default UpdatePatient;
