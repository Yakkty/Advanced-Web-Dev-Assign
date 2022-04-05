//This component displays an individual room item in the rooms list component.
//This component displays a grid item, with values obtained via props from the rooms list

//This component also has a button which will take a user to a page to update the respective room
//This is accomplished using react router doms Link element, and dynamically setting the url with props

//imports
import { Grid } from "@mui/material";

import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/FormElements/Button";
import classes from "./Room.module.css";

const Room = (props) => {
  return (
    <Grid item xs={2} sm={2} md={4} key={props.id} zeroMinWidth>
      <Card className={classes["room-content"]}>
        <div className={classes.room}>
          <div className={classes["room-title"]}>
            <h2>{props.name}</h2>
            <p>Floor: {props.floor}</p>
          </div>
          <div className={classes["room-info"]}>
            <h2>Reservation Status: {props.reservations}</h2>
            <h2>Room Availabiltiy: {props.roomAvailability}</h2>
            <p>Number of available beds: {props.bedAvailability}</p>
          </div>
          <div className={classes["room-actions"]}>
            <Button to={`/rooms/${props.id}`}>EDIT</Button>
          </div>
        </div>
      </Card>
    </Grid>
  );
};

export default Room;
