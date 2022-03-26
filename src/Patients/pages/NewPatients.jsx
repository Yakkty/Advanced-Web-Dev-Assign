import { useState } from "react";

// import { useHistory } from "react-router-dom";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import classes from "./PatientForm.module.css";

const NewPatients = (props) => {
  // const history = useHistory();

  const [enteredName, setName] = useState("");
  const [enteredAge, setAge] = useState("");
  const [enteredStatus, setStatus] = useState("");
  // const [enteredReport, setReport] = useState(null);
  // const [enteredImage, setImage] = useState(null);

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setAge(event.target.value);
  };
  const statusChangeHandler = (event) => {
    setStatus(event.target.value);
  };
  // const reportChangeHandler = (event) => {
  //   setReport(event.target.value);
  // };
  // const imageChangeHandler = (event) => {
  //   setImage(event.target.value);
  // };

  const submitHandler = (event) => {
    event.preventDefault();

    const patientData = {
      name: enteredName,
      age: enteredAge,
      status: enteredStatus,
      id: Math.random().toString(),
      // report: enteredReport,
      // imageUrl: enteredImage,
    };
    props.onSavePatientData(patientData);
    props.onRegister();
    // history.push("/");
    setName("");
    setAge("");
    setStatus("");
    // setReport(null);
    // setImage(null);
  };

  return (
    <form className={classes["patient-form"]} onSubmit={submitHandler}>
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
      {/* <Input
        element="input"
        type="file"
        label="Report"
        value={enteredReport}
        onChange={reportChangeHandler}
      /> */}
      {/* <Input
        element="input"
        type="image"
        label="Image"
        value={enteredImage}
        onChange={imageChangeHandler}
      /> */}
      <Button type="submit">Register</Button>
    </form>
  );
};

export default NewPatients;
