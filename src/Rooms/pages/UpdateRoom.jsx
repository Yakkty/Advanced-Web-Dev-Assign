import { useParams } from "react-router-dom";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
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

const UpdateProvider = () => {
  const roomId = useParams().roomId;

  const identifedRoom = DUMMY_ROOMS.find((p) => p.id === roomId);

  if (!identifedRoom) {
    return (
      <div className="center">
        <h2>Could not find patient</h2>
      </div>
    );
  }
  return (
    <form className={classes["room-form"]}>
      <Input
        id="name"
        element="input"
        type="text"
        label="Room Name"
        onInput={() => {}}
        value={identifedRoom.name}
      />
      <Input
        id="reservations"
        element="input"
        type="text"
        label="Room Reservation"
        onInput={() => {}}
        value={identifedRoom.reservations}
      />
      <Input
        id="bedAvailability"
        element="input"
        type="text"
        label="Number of available beds"
        onInput={() => {}}
        value={identifedRoom.bedAvailability}
      />
      <Input
        id="roomAvailability"
        element="input"
        label="Room Availability"
        onInput={() => {}}
        value={identifedRoom.roomAvailability}
      />
      <Button type="submit">UPDATE</Button>
    </form>
  );
};

export default UpdateProvider;
