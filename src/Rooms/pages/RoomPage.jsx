import { Fragment, useEffect, useState } from "react";

import Card from "../../Shared/Components/UIElements/Card";
import RoomsList from "../components/RoomsList";
import { useHttp } from "../../Shared/Components/hooks/http-hook";

import classes from "./RoomPage.module.css";

const RoomPage = () => {
  const [roomData, setRoomData] = useState([]);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/rooms"
        );

        setRoomData(responseData.rooms);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRooms();
  }, [sendRequest]);

  const roomAvailabilityArray = [...roomData, []];


  const filteredRoomAvailabilityArray = roomAvailabilityArray.filter((room) => {
    return room.roomAvailability === "Available";
  });

  const numberOfAvailableRooms = filteredRoomAvailabilityArray.length.toString();

  return (
    <Fragment>
      <Card className={classes["room-page__title"]}>
        <h1>John Bazwells COVID Clinic</h1>
        <p>Total Number of Rooms: 6</p>
        <p>Number of Available Rooms: {numberOfAvailableRooms}</p>
      </Card>
      {roomData && <RoomsList rooms={roomData} />}
    </Fragment>
  );
};

export default RoomPage;
