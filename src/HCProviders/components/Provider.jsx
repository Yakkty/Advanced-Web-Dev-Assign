import { Grid } from "@mui/material";

import Card from "../../Shared/Components/UIElements/Card";
import Avatar from "../../Shared/Components/UIElements/Avatar";
import Button from "../../Shared/Components/FormElements/Button";
import classes from "./Provider.module.css";

const Provider = (props) => {
  return (
    <Grid item xs={2} sm={2} md={4} key={props.id} zeroMinWidth>
      <Card className={classes["provider-content"]}>
        <div className={classes.provider}>
          <div className={classes["provider-image"]}>
            <Avatar image={props.image} alt={props.name} />
          </div>
          <Card className={classes["provider-info"]}>
            <h1>{props.role}</h1>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p></p>
          </Card>
          <div className={classes["provider-actions"]}>
            <Button to={`/provider/${props.id}`}>EDIT</Button>
            <Button>DELETE</Button>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default Provider;
