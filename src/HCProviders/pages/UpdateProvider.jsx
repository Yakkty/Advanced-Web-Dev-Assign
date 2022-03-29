import { useParams } from "react-router-dom";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import image2 from "../../Assets/female doctor.jpg";
import classes from "./ProviderForm.module.css";

const DUMMY_PROVIDERS = [
  {
    id: "pv1",
    name: "Tom",
    role: "Doctor",
    description:
      "This is a description of a medical professional, they do xyz haha hehe",
    image: image2,
  },
  {
    id: "pv2",
    name: "Thomas",
    role: "Nurse",
    description:
      "This is a description of a medical professional, they do xyz haha hehe",
    image: image2,
  },
  {
    id: "pv3",
    name: "Baz",
    role: "Surgeon",
    description:
      "This is a description of a medical professional, they do xyz haha hehe",
    image: image2,
  },
  {
    id: "pv4",
    name: "Bazo",
    role: "Doctor",
    description:
      "This is a description of a medical professional, they do xyz haha hehe",
    image: image2,
  },
  {
    id: "pv5",
    name: "Bazo",
    role: "Doctor",
    description:
      "This is a description of a medical professional, they do xyz haha hehe",
    image: image2,
  },
  {
    id: "pv6",
    name: "Bazo",
    role: "Doctor",
    description:
      "This is a description of a medical professional, they do xyz haha hehe",
    image: image2,
  },
];

const UpdateProvider = (props) => {
  const providerId = useParams().providerId;
  console.log(providerId);

  const identifiedProvider = DUMMY_PROVIDERS.find((p) => p.id === providerId);

  console.log(identifiedProvider);

  if (!identifiedProvider) {
    return (
      <div className="center">
        <h2>Could not find provider</h2>
      </div>
    );
  }
  return (
    <form className={classes["provider-form"]}>
      <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        onInput={() => {}}
        value={identifiedProvider.name}
      />
      <Input
        id="role"
        element="input"
        type="text"
        label="Role"
        onInput={() => {}}
        value={identifiedProvider.role}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        onInput={() => {}}
        value={identifiedProvider.description}
      />
      <Button type="submit">UPDATE</Button>
    </form>
  );
};

export default UpdateProvider;
