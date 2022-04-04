import { useRef, useState, useEffect } from "react";

import classes from "./FileUpload.module.css";

const FileUpload = (props) => {
  const [report, setReport] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  const fileSelectorRef = useRef();

  useEffect(() => {
    if (!report) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(report);
  }, [report]);

  const selectedHandler = (event) => {
    let report;
    if (event.target.files && event.target.files !== 0) {
      report = event.target.files[0];
      setReport(report);
    } else {
      console.log("Invalid file");
    }
    props.onInput({
      id: props.id,
      value: report,
    });
  };

  const selectFileHandler = () => {
    fileSelectorRef.current.click();
  };

  return (
    <label className={classes.fileUpload}>
      <input
        type="file"
        ref={fileSelectorRef}
        id={props.id}
        accept="application/pdf"
        onChange={selectedHandler}
      />
      Upload Record
    </label>
  );
};

export default FileUpload;
