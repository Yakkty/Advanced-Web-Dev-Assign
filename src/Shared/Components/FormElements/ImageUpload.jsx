import { useRef, useState, useEffect } from "react";

import Button from "./Button";

import classes from "./ImageUpload.module.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const fileSelectorRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const selectedHandler = (event) => {
    let file;
    if (event.target.files && event.target.files !== 0) {
      file = event.target.files[0];
      setFile(file);
    } else {
      console.log("File is invalid");
    }
    props.onInput({
      id: props.id,
      value: file,
    });
  };

  const selectImageHandler = () => {
    fileSelectorRef.current.click();
  };

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
