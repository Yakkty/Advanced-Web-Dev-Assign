import { useState, useContext } from "react";

import Input from "../../Shared/Components/FormElements/Input";
import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";
import Button from "../../Shared/Components/FormElements/Button";
import { useHttp } from "../../Shared/Components/hooks/http-hook";
import { AuthContext } from "../../Shared/Components/context/auth-context";

import classes from "./ProviderForm.module.css";

const NewProvider = (props) => {
  const auth = useContext(AuthContext);
  const [enteredRole, setRole] = useState("");
  const [enteredName, setName] = useState("");
  const [enteredDescription, setDescription] = useState("");
  const { sendRequest } = useHttp();
  const [enteredImage, setImage] = useState({
    id: "",
    value: null,
  });

  const roleChangeHandler = (event) => {
    setRole(event.target.value);
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const imageChangeHandler = (file) => {
    setImage({
      id: file.id,
      value: file.value,
    });
    console.log(file);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("role", enteredRole);
      formData.append("name", enteredName);
      formData.append("description", enteredDescription);
      formData.append("image", enteredImage.value);
      const responseData = await sendRequest(
        "http://localhost:5000/api/providers",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      props.onSaveProviderData(responseData);

      setRole("");
      setName("");
      setDescription("");
      props.onRegister();
    } catch (err) {
      console.log(err);
    }
    

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
      <ImageUpload id="image" center onInput={imageChangeHandler} />
      <Button type="submit">Register</Button>
    </form>
  );
};

export default NewProvider;
