//This is a custom component for uploading files

//imports
import { useState } from "react";

import classes from "./FileUpload.module.css";

//This component is a reusable file upload component, which will display a label + input area with a file type
//This component will then store the value in state, and pass this state to a parent component
const FileUpload = (props) => {
  const [report, setReport] = useState();

  //This handler function is responsible for checking file validity, storing the value in state,
  //and passing the state to a parent component

  const selectedHandler = (event) => {
    let report;

    //Check that a file exists and there is more than 1
    if (event.target.files && event.target.files !== 0) {
      //The value is located at the first index
      report = event.target.files[0];
      //store thisvalue in state
      setReport(report);
    } else {
      //log error if checks fail
      console.log("Invalid file");
    }
    //If a valid file is found and stored in state, call a function passed down by a parent component
    //onInput is a function from a parent component, which can be called in this by utilising props
    //Passing the id of the report along with its value
    props.onInput({
      id: props.id,
      value: report,
    });
  };

  //Return the html markup of the file upload component, which consists of a label and an input
  //This Field has the option to be set to active, which will set the colour and border to green
  //This is used to help determine if the user has selected a file or not
  return (
    <label
      className={`${classes.fileUpload} ${props.active && classes.active}`}
    >
      <input
        type="file"
        id={props.id}
        accept="application/pdf"
        onChange={selectedHandler}
      />
      Upload Record
    </label>
  );
};

export default FileUpload;
