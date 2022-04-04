import { useContext, useState } from "react";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import FileUpload from "../../Shared/Components/FormElements/FileUpload";
import { AuthContext } from "../../Shared/Components/context/auth-context";
import { useHttp } from "../../Shared/Components/hooks/http-hook";

import classes from "./PatientForm.module.css";

const NewPatients = (props) => {
  const auth = useContext(AuthContext);
  // const history = useHistory();
  const { sendRequest } = useHttp();
  const [enteredName, setName] = useState("");
  const [enteredAge, setAge] = useState("");
  const [enteredStatus, setStatus] = useState("");

  const [enteredReport, setReport] = useState({
    id: "",
    value: null,
  });
  // const [enteredImage, setImage] = useState({
  //   id: "",
  //   value: null,
  // });

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
  // const imageChangeHandler = (file) => {
  //   setImage({
  //     id: file.id,
  //     value: file.value,
  //   });
  // };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", enteredName);
      formData.append("age", enteredAge);
      formData.append("status", enteredName);
      formData.append("report", enteredReport.value);
      // formData.append("image", enteredImage.value);
      const responseData = await sendRequest(
        "http://localhost:5000/api/patients",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onSavePatientData(responseData);

      setName("");
      setAge("");
      setStatus("");
      props.onRegister();
    } catch (err) {
      console.log(err);
      console.log(enteredReport.value);
    }
    
  };

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
      <FileUpload id="report" onInput={fileChangeHandler} />
      {/* <ImageUpload id="image" center onInput={imageChangeHandler} /> */}

      <Button type="submit">Register</Button>
    </form>
  );
};

export default NewPatients;
