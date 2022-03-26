import { useState } from "react";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import classes from "./ProviderForm.module.css";

const NewProvider = (props) => {
  // const history = useHistory();

  const [enteredRole, setRole] = useState("");
  const [enteredName, setName] = useState("");
  const [enteredDescription, setDescription] = useState("");
  // const [enteredImage, setImage] = useState(null);

  const roleChangeHandler = (event) => {
    setRole(event.target.value);
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  // const imageChangeHandler = (event) => {
  //   setImage(event.target.value);
  // };

  const submitHandler = (event) => {
    event.preventDefault();

    const providerData = {
      role: enteredRole,
      name: enteredName,
      description: enteredDescription,
      id: Math.random().toString(),

      // imageUrl: enteredImage,
    };
    props.onSaveProviderData(providerData);
    props.onRegister();

    setRole("");
    setName("");
    setDescription("");

    // setImage(null);
  };

  return (
    <form className={classes["provider-form"]} onSubmit={submitHandler}>
      <Input
        element="input"
        type="text"
        label="Role"
        onChange={roleChangeHandler}
        value={enteredRole}
      />
      <Input
        element="input"
        type="text"
        label="Name"
        onChange={nameChangeHandler}
        value={enteredName}
      />
      <Input
        type="text"
        label="Description"
        onChange={descriptionChangeHandler}
        value={enteredDescription}
      />
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

export default NewProvider;
