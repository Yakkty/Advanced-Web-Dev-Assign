import { Fragment } from "react";

import Card from "../../Shared/Components/UIElements/Card";
import RoomsList from "../components/RoomsList";
import classes from "./RoomPage.module.css";

const DUMMY_ROOMS = [
  {
    id: "r1",
    name: "1",
    floor: "0",
    reservations: "Available",
    bedAvailability: "8",
    roomAvailability: "Available",
  },
  {
    id: "r2",
    name: "2",
    floor: "0",
    reservations: "Available",
    bedAvailability: "0",
    roomAvailability: "Unavailable",
  },
  {
    id: "r3",
    name: "3",
    floor: "0",
    reservations: "Reserved",
    bedAvailability: "0",
    roomAvailability: "unAvailable",
  },
  {
    id: "r4",
    name: "4",
    floor: "0",
    reservations: "Available",
    bedAvailability: "05",
    roomAvailability: "unAvailable",
  },
  {
    id: "r5",
    name: "5",
    floor: "0",
    reservations: "Available",
    bedAvailability: "5",
    roomAvailability: "Available",
  },
  {
    id: "r6",
    name: "6",
    floor: "0",
    reservations: "Available",
    bedAvailability: "9",
    roomAvailability: "Available",
  },
];

const filteredRoomsArray = DUMMY_ROOMS.filter((room) => {
  return room.roomAvailability === "Available";
});

const numberOfAvailableRooms = filteredRoomsArray.length.toString();

const RoomPage = () => {
  return (
    <Fragment>
      <Card className={classes["room-page__title"]}>
        <h1>John Bazwells COVID Clinic</h1>
        <p>Total Number of Rooms: 6</p>
        <p>Number of Available Rooms: {numberOfAvailableRooms}</p>
      </Card>
      <RoomsList rooms={DUMMY_ROOMS} />
    </Fragment>
  );
};

export default RoomPage;
