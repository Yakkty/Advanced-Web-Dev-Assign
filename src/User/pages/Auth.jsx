import { useContext } from "react";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import classes from "./Auth.module.css";
import { AuthContext } from "../../Shared/Components/context/auth-context";

const Auth = () => {
  const auth = useContext(AuthContext);

  const authSubmitHandler = (event) => {
    event.preventDefault();
    auth.login(true);
  };

  return (
    <form className={classes["auth-form"]} onSubmit={authSubmitHandler}>
      <Input
        id="username"
        element="input"
        type="text"
        label="Username"
        onInput={() => {}}
      />
      <Input
        id="password"
        element="input"
        type="password"
        label="Password"
        onInput={() => {}}
      />
      <Button type="submit">LOGIN</Button>
    </form>
  );
};

export default Auth;
