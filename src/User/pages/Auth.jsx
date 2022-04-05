//This component is responsible for rendering the login form

//Imports
import { useContext, useState } from "react";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import classes from "./Auth.module.css";
import { AuthContext } from "../../Shared/Components/context/auth-context";
import { useHttp } from "../../Shared/Components/hooks/http-hook";

//This component will display a form, store form values in state and log users in
const Auth = () => {
  //Store our AuthContext in a variable, which is derived from our App.js context provider
  const auth = useContext(AuthContext);
  //Store user inputs in state
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Gain access to our custom useHttp hooks method, which sends HTTP requests to our REST Api backend server
  const { sendRequest } = useHttp();

  //These handler functions will be called on the onChange of form inputs, and store user inputs in state
  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  //This function is responsible for the form submission, to send user inputs to the backend, and logs the user in
  //This function is asynchronous as it involves sending requests to a backend, which can take some time
  //This function will suspend execution until the request finishes
  const authSubmitHandler = async (event) => {
    //event prevent default stops the browser reloading the page on form submission
    event.preventDefault();

    //Try catch with http requests as these can fail
    try {
      //Call custom http hook method sendrequest to send a http request to our rest api backend
      //This function requires a url, which is the url the backend expects, along with the request method, which is a POST request
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/login",
        "POST",
        //This converts strings to JSON,
        JSON.stringify({
          username: userName,
          password: password,
        }),
        //Headers are set to JSON, which is a very common way of sending data
        {
          "Content-Type": "application/json",
        }
      );

      //Once this request completes, a user will be logged in, passing the users ID and token
      auth.login(responseData.userId, responseData.token);
    } catch (err) {
      //If this fails, the error is logged to the console
      console.log(err);
      throw err;
    }
  };

  //This is the form which is displayed to a user,
  //This form displays two inputs and a button
  return (
    <form className={classes["auth-form"]} onSubmit={authSubmitHandler}>
      <Input
        id="username"
        element="input"
        type="text"
        label="Username"
        onChange={usernameHandler}
      />
      <Input
        id="password"
        element="input"
        type="password"
        label="Password"
        onChange={passwordHandler}
      />
      <Button type="submit">LOGIN</Button>
    </form>
  );
};

export default Auth;
