//This component is responsible for adding new patients

//imports
import { useContext, useState } from "react";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import FileUpload from "../../Shared/Components/FormElements/FileUpload";
import { AuthContext } from "../../Shared/Components/context/auth-context";
import { useHttp } from "../../Shared/Components/hooks/http-hook";

import classes from "./PatientForm.module.css";

//This component displays a form for adding new patients
//along with functionality to send POST http requests to the backend
const NewPatients = (props) => {
  //get access to the auth context
  const auth = useContext(AuthContext);
  //usestate calls for storing form data
  const [enteredName, setName] = useState("");
  const [enteredAge, setAge] = useState("");
  const [enteredStatus, setStatus] = useState("");

  const [enteredReport, setReport] = useState({
    id: "",
    value: null,
  });

  //get access to the send request method from our custom usehttp hook
  const { sendRequest } = useHttp();

  //Handler functions to store form data in state
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setAge(event.target.value);
  };
  const statusChangeHandler = (event) => {
    setStatus(event.target.value);
  };
  const fileChangeHandler = (record) => {
    setReport({
      id: record.id,
      value: record.value,
    });
    console.log();
  };

  //Handler function for form submission
  const submitHandler = async (event) => {
    //event prevent default to prevent page reload
    event.preventDefault();

    //try catch as this request can fail
    try {
      //Create new form data object
      const formData = new FormData();
      //append user inputs with a key and their corresponding values
      formData.append("name", enteredName);
      formData.append("age", enteredAge);
      formData.append("status", enteredName);
      formData.append("report", enteredReport.value);
      //http POST request to backend, passing the formData as the request body
      const responseData = await sendRequest(
        "http://localhost:5000/api/patients",
        "POST",
        formData,
        //Passing the token as an authorization header
        //This is to prevent unauthorized users from sending requests to the backend
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      //Function to store the responseData, this is passed from a parent componnent and called in this component
      //The response data is passed back to the parent component as an argument
      props.onSavePatientData(responseData);

      //Clear the form
      setName("");
      setAge("");
      setStatus("");
      //Hacky way of rerendering the page to display the patient data after submission
      props.onRegister();
    } catch (err) {
      //log errors
      console.log(err);
      // console.log(enteredReport.value);
    }
  };

  //Form to collect user inputs and a submit button
  return (
    <form
      className={classes["patient-form"]}
      onSubmit={submitHandler}
      encType="multipart/form-data"
    >
      <Input
        element="input"
        type="text"
        label="Name"
        onChange={nameChangeHandler}
        value={enteredName}
      />
      <Input
        element="input"
        type="number"
        label="Age"
        onChange={ageChangeHandler}
        value={enteredAge}
      />
      <Input
        element="input"
        type="text"
        label="Status"
        onChange={statusChangeHandler}
        value={enteredStatus}
      />
      {enteredReport.value ? (
        <FileUpload id="report" onInput={fileChangeHandler} active />
      ) : (
        <FileUpload id="report" onInput={fileChangeHandler} />
      )}
      {/* <ImageUpload id="image" center onInput={imageChangeHandler} /> */}

      <Button type="submit">Register</Button>
    </form>
  );
};

export default NewPatients;
