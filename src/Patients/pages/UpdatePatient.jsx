import { useState, useEffect, useContext, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import { useHttp } from "../../Shared/Components/hooks/http-hook";
import { AuthContext } from "../../Shared/Components/context/auth-context";

import classes from "./PatientForm.module.css";

const UpdatePatient = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttp();
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    status: "",
  });

  const history = useHistory();
  const patientId = useParams().patientId;

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

  if (!patientData) {
    return (
      <div className="center">
        <h2>Could not find patient</h2>
      </div>
    );
  }

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

  const patientSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:5000/api/patients/${patientId}`,
        "PATCH",
        JSON.stringify({
          name: patientData.name,
          age: patientData.age,
          status: patientData.status,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/patients");
    } catch (err) {
      console.log(err);
    }
  };

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
