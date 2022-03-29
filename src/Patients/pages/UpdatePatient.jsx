import { useParams } from "react-router-dom";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import image from "../../Assets/female doctor.jpg";
import classes from "./PatientForm.module.css"
const DUMMY_PATIENTS = [
  {
    id: "p1",
    name: "Rafael",
    age: "25",
    gender: "Male",
    status: "Current Patient",
    reports: "test",
    imageUrl: image,
  },
  {
    id: "p2",
    name: "Lisa",
    age: "22",

    status: "Recovered",
    reports: "test",
    imageUrl: image,
  },
  {
    id: "p3",
    name: "Tom",
    age: "19",

    status: "Current Patient",
    reports: "test",
    imageUrl: image,
  },
  {
    id: "p4",
    name: "Tom",
    age: "19",

    status: "Current Patient",
    reports: "test",
    imageUrl: image,
  },
  {
    id: "p5",
    name: "Tom",
    age: "19",

    status: "Current Patient",
    reports: "test",
    imageUrl: image,
  },
  {
    id: "p6",
    name: "Tom",
    age: "19",

    status: "Current Patient",
    reports: "test",
    imageUrl: image,
  },
];

const UpdateProvider = () => {
  const patientId = useParams().patientId;

  const identifiedPatient = DUMMY_PATIENTS.find((p) => p.id === patientId);

  if (!identifiedPatient) {
    return (
      <div className="center">
        <h2>Could not find patient</h2>
      </div>
    );
  }
  return (
    <form className={classes["patient-form"]}>
      <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        onInput={() => {}}
        value={identifiedPatient.name}
      />
      <Input
        id="age"
        element="input"
        type="number"
        label="Age"
        onInput={() => {}}
        value={identifiedPatient.age}
      />
      <Input
        id="status"
        element="input"
        label="Patient Status"
        onInput={() => {}}
        value={identifiedPatient.status}
      />
      <Button type="submit">UPDATE</Button>
    </form>
  );
};

export default UpdateProvider;
