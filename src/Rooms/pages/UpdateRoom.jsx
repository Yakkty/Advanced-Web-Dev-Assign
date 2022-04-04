import { useState, useEffect, useContext, Fragment } from "react";

import { useParams, useHistory } from "react-router-dom";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import { useHttp } from "../../Shared/Components/hooks/http-hook";
import { AuthContext } from "../../Shared/Components/context/auth-context";

import classes from "./RoomPage.module.css";

const UpdateRoom = () => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttp();
  const [roomData, setRoomData] = useState({
    name: "",
    floor: "",
    reservations: "",
    bedAvailability: "",
    roomAvailability: "",
  });

  const history = useHistory();
  const roomId = useParams().roomId;

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/rooms/${roomId}`
        );
        setRoomData({
          name: responseData.room.name,
          floor: responseData.room.floor,
          reservations: responseData.room.reservations,
          bedAvailability: responseData.room.bedAvailability,
          roomAvailability: responseData.room.roomAvailability,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoom();
  }, [sendRequest, roomId, setRoomData]);

  if (!roomData) {
    return (
      <div className="center">
        <h2>Could not find patient</h2>
      </div>
    );
  }

  const updateReservationsHandler = (event) => {
    setRoomData({
      ...roomData,
      reservations: event.target.value,
    });
  };

  const updateBedAvailabilityHandler = (event) => {
    setRoomData({
      ...roomData,
      bedAvailability: event.target.value,
    });
  };

  const updateRoomAvailabilityHandler = (event) => {
    setRoomData({
      ...roomData,
      roomAvailability: event.target.value,
    });
  };

  const roomSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:5000/api/rooms/${roomId}`,
        "PATCH",
        JSON.stringify({
          reservations: roomData.reservations,
          bedAvailability: roomData.bedAvailability,
          roomAvailability: roomData.roomAvailability,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/rooms");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      {roomData && (
        <form className={classes["room-form"]} onSubmit={roomSubmitHandler}>
          <Input
            id="reservations"
            element="input"
            type="text"
            label="Room Reservation"
            onChange={updateReservationsHandler}
            value={roomData.reservations}
          />
          <Input
            id="bedAvailability"
            element="input"
            type="text"
            label="Number of available beds"
            onChange={updateBedAvailabilityHandler}
            value={roomData.bedAvailability}
          />
          <div className={classes.dropdown}>
            <label className={classes["dropdown-label"]}>
              Select Room Availability:
            </label>
            <select
              value={roomData.roomAvailability}
              onChange={updateRoomAvailabilityHandler}
              className={classes["dropdown-actions"]}
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          {/* <Input
            id="roomAvailability"
            element="input"
            label="Room Availability"
            onChange={updateRoomAvailabilityHandler}
            value={roomData.roomAvailability}
          /> */}
          <Button type="submit">UPDATE</Button>
        </form>
      )}
    </Fragment>
  );
};

export default UpdateRoom;
