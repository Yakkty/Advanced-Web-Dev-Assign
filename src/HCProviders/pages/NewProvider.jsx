//This component is responsible for adding new providers

//imports
import { useState, useContext } from "react";

import Input from "../../Shared/Components/FormElements/Input";
import ImageUpload from "../../Shared/Components/FormElements/ImageUpload";
import Button from "../../Shared/Components/FormElements/Button";
import { useHttp } from "../../Shared/Components/hooks/http-hook";
import { AuthContext } from "../../Shared/Components/context/auth-context";

import classes from "./ProviderForm.module.css";

//This component displays a form for adding new providers
//along with functionality to send POST http requests to the backend
const NewProvider = (props) => {
  //get access to the auth context
  const auth = useContext(AuthContext);
  //usestate calls for storing form data
  const [enteredRole, setRole] = useState("");
  const [enteredName, setName] = useState("");
  const [enteredDescription, setDescription] = useState("");
  const [enteredImage, setImage] = useState({
    id: "",
    value: null,
  });
  //get access to the send request method from our custom usehttp hook
  const { sendRequest } = useHttp();

  //Handler functions to store form data in state
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

  //Handler function for form submission
  const submitHandler = async (event) => {
    //event prevent default to prevent page reload
    event.preventDefault();

    //try catch as this request can fail
    try {
      //Create new form data object
      const formData = new FormData();
      //append user inputs with a key and their corresponding values
      formData.append("role", enteredRole);
      formData.append("name", enteredName);
      formData.append("description", enteredDescription);
      formData.append("image", enteredImage.value);
      //http POST request to backend, passing the formData as the request body
      const responseData = await sendRequest(
        "http://localhost:5000/api/providers",
        "POST",
        formData,
        //Passing the token as an authorization header
        //This is to prevent unauthorized users from sending requests to the backend
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      //Function to store the responseData, this is passed from a parent componnent and called in this component
      //The response data is passed back to the parent component as an argument
      props.onSaveProviderData(responseData);

      //Clear the form
      setRole("");
      setName("");
      setDescription("");
      setImage(null);
      //Hacky way of rerendering the page to display the provider data after submission
      props.onRegister();
    } catch (err) {
      //log errors
      console.log(err);
    }

  };

  //Form to collect user inputs and a submit button
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
