import { useContext } from "react";

import { Grid } from "@mui/material";

import Card from "../../Shared/Components/UIElements/Card";
import Avatar from "../../Shared/Components/UIElements/Avatar";
import Button from "../../Shared/Components/FormElements/Button";
import { useHttp } from "../../Shared/Components/hooks/http-hook";
import classes from "./Provider.module.css";
import { AuthContext } from "../../Shared/Components/context/auth-context";

const Provider = (props) => {
  const auth = useContext(AuthContext)
  const { sendRequest } = useHttp();

  const deleteProviderHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/providers/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid item xs={2} sm={2} md={4} key={props.id} zeroMinWidth>
      <Card className={classes["provider-content"]}>
        <div className={classes.provider}>
          <div className={classes["provider-image"]}>
            <Avatar
              image={`http://localhost:5000/${props.image}`}
              alt={props.name}
            />
          </div>
          <Card className={classes["provider-info"]}>
            <h1>{props.role}</h1>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p></p>
          </Card>
          <div className={classes["provider-actions"]}>
            <Button to={`/provider/${props.id}`}>EDIT</Button>
            <Button onClick={deleteProviderHandler}>DELETE</Button>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default Provider;
