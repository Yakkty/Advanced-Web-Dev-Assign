import { useContext, useState } from "react";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import classes from "./Auth.module.css";
import { AuthContext } from "../../Shared/Components/context/auth-context";
import { useHttp } from "../../Shared/Components/hooks/http-hook";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { sendRequest } = useHttp();

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/users/login",
        "POST",
        JSON.stringify({
          username: userName,
          password: password,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      auth.login();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

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
