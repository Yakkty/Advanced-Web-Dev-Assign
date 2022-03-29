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
