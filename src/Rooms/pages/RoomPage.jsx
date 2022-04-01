import { Fragment, useEffect, useState } from "react";

import Card from "../../Shared/Components/UIElements/Card";
import RoomsList from "../components/RoomsList";
import { useHttp } from "../../Shared/Components/hooks/http-hook";

import classes from "./RoomPage.module.css";

const RoomPage = () => {
  const [roomData, setRoomData] = useState();
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

  // const filteredRoomsArray = roomData.filter((room) => {
  //   return room.roomAvailability === "Available";
  // });

  // const numberOfAvailableRooms = filteredRoomsArray.length.toString();

  return (
    <Fragment>
      <Card className={classes["room-page__title"]}>
        <h1>John Bazwells COVID Clinic</h1>
        <p>Total Number of Rooms: 6</p>
        <p>Number of Available Rooms: x</p>
      </Card>
      {roomData && <RoomsList rooms={roomData} />}
    </Fragment>
  );
};

export default RoomPage;
