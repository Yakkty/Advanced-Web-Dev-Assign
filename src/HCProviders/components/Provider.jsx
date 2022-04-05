//This is the child component to the providers list, which describes an individual provider in the grid

//imports
import { useContext } from "react";

import { Grid } from "@mui/material";

import Card from "../../Shared/Components/UIElements/Card";
import Avatar from "../../Shared/Components/UIElements/Avatar";
import Button from "../../Shared/Components/FormElements/Button";
import { useHttp } from "../../Shared/Components/hooks/http-hook";
import classes from "./Provider.module.css";
import { AuthContext } from "../../Shared/Components/context/auth-context";

//This component displays specific data related to an individual provider, along with being able to delete providers
const Provider = (props) => {
  //get access to the auth context
  const auth = useContext(AuthContext)
  //get access to send request method from our custom useHTTP hook
  const { sendRequest } = useHttp();

  //Handler function for deleting providers.
  //This function sends a http DELETE request to the backend, with a dynamically set url.
  //The url gets passed the id of the provider, so the delete only deletes the related provider
  const deleteProviderHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/providers/${props.id}`,
        "DELETE",
        null,
        //The token which is granted from the auth context is passed as a valid token is required
        //This stops unauthorized users from deleting providers
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      //this function call removes the specific provider from the frontends state, which is called here via props
      //The id is passed as an argument so the function knows which provider should be removed
      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };

  //Grid layout displaying information regarding a provider
  //The image path is dynamically set with props.image, as the actual image is stored on the backend, 
  // and the database stores a path
  //Edit directs a user to an update provider page, with a dynamically set url of the id of the provider
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
