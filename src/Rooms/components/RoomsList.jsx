//This component is a child component to the rooms page, which displays the layout for the rooms page
//This page utilises the Grid layout from material ui, and will display room items in a grid layout
//This component iterates through every room using the javascript map method,
//For every room, a Room component will render with the values of that particular room
//These are passed down to the child room component, which are originally accessed via props from the parent roompage component

//imports
import { Grid } from "@mui/material";

import Room from "./Room";

const RoomsList = (props) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 6, md: 12 }}
    >
      {props.rooms.map((room) => (
        <Room
          key={room.id}
          id={room.id}
          name={room.name}
          floor={room.floor}
          reservations={room.reservations}
          bedAvailability={room.bedAvailability}
          roomAvailability={room.roomAvailability}
        />
      ))}
    </Grid>
  );
};

export default RoomsList;
