//This is a reusable image upload component

//imports
import { useRef, useState, useEffect } from "react";

import Button from "./Button";

import classes from "./ImageUpload.module.css";

//This function will display inputs for uploading an image, along with displaying the provided image as a preview to the user
const ImageUpload = (props) => {
  //Store the image file, and the preview url in state
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  //Utilising useRef hook to store a reference to the input
  const fileSelectorRef = useRef();

  //This useEffect call will read file contents to then store the preview url in state
  //along with reading the file contents
  useEffect(() => {
    if (!file) {
      return;
    }
    //Create new filereader object
    const fileReader = new FileReader();
    //load filereader and
    fileReader.onload = () => {
      //store the properties of the files contents when reading completes
      //utilising a callback so onload only completes once the file is read
      setPreviewUrl(fileReader.result);
    };
    //Read contents of the file
    fileReader.readAsDataURL(file);
  }, [file]);

  //This function is responsible for the submission of the image
  const selectedHandler = (event) => {
    let file;
    //Check that a file exists and is not equal to 0
    if (event.target.files && event.target.files !== 0) {
      //Store the file which is located in the first index of the files array
      file = event.target.files[0];
      //This value is stored in state
      setFile(file);
    } else {
      //log if checks are not met
      console.log("File is invalid");
    }
    //call a function from a parent component to store the image values and id
    //This can be done by using props to call the function
    //
    props.onInput({
      id: props.id,
      value: file,
    });
  };

  //This utilised useRef to get a reference to the image selected
  const selectImageHandler = () => {
    fileSelectorRef.current.click();
  };

  //Displays the inputs for selecting the image, a div for displaying the image preview along with a submit button
  return (
    <div className={classes["form-control"]}>
      <input
        type="file"
        name="image"
        ref={fileSelectorRef}
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={selectedHandler}
      />
      <div
        className={`${classes["image-upload"]} ${
          props.center && classes["center"]
        }`}
      >
        <div className={classes["image-upload__preview"]}>
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Select an image</p>}
        </div>
        <Button
          type="button"
          onClick={selectImageHandler}
          className={classes["image-upload__actions"]}
        >
          Select Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
