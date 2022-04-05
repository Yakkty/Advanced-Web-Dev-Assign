//This component is responsible for updating room data
//This component displays a form, which is filled with values from its respective room
//Values are accessed via HTTP get request, which retrieves values from the database
//The room is then consequently updated with a PATCH request

//Imports
import { useState, useEffect, useContext, Fragment } from "react";

import { useParams, useHistory } from "react-router-dom";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import { useHttp } from "../../Shared/Components/hooks/http-hook";
import { AuthContext } from "../../Shared/Components/context/auth-context";

import classes from "./RoomPage.module.css";

const UpdateRoom = () => {
  //Gain access to the auth context
  const auth = useContext(AuthContext);
  //Gain access to the sendrequest method from our custom usehttp hook
  const { sendRequest } = useHttp();
  //room data stored in state
  const [roomData, setRoomData] = useState({
    name: "",
    floor: "",
    reservations: "",
    bedAvailability: "",
    roomAvailability: "",
  });

  //store roomid in a variable which is accessed from the url paramters
  //story the usehistory object in a helper variable, this is utilised for redirecting the user
  const history = useHistory();
  const roomId = useParams().roomId;

  //UseEffect call to retrieve room data from the database with a GET request
  //These values are then stored in state
  //This is called when the component renders as we want the data to be in the form immediately,
  //along with if any of its dependancies change (sendrequst, room id, setRoomData)
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
        //log errors
        console.log(err);
      }
    };
    fetchRoom();
  }, [sendRequest, roomId, setRoomData]);

  //If theres no rooms then display a div displaying it could not find room
  if (!roomData) {
    return (
      <div className="center">
        <h2>Could not find room</h2>
      </div>
    );
  }

  //Below are handler functions to store the user inputs into state
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

  //This submit handler function is responsible for the form submission
  const roomSubmitHandler = async (event) => {
    //event preventDefault to prevent page reload
    event.preventDefault();

    //try catch as this request can fail
    try {
      //Call sendrequest method to a url with a dynamic roomId, this allows for the correct url to be passed
      //as its the specific rooms id.
      //This is an update call so the request method is PATCH
      await sendRequest(
        `http://localhost:5000/api/rooms/${roomId}`,
        "PATCH",
        //Json stringify to convert the room data stored in state into JSON
        JSON.stringify({
          reservations: roomData.reservations,
          bedAvailability: roomData.bedAvailability,
          roomAvailability: roomData.roomAvailability,
        }),
        //Headers set to JSON as JSON data is being sent
        //Authorization header sent along with the user token
        //This authorization header prevents unauthorized users from sending http requests
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      //Redirect user back to the rooms page on completion
      history.push("/rooms");
    } catch (err) {
      //log errors
      console.log(err);
    }
  };

  //Form displaying the update rooms form
  //This form is only displayed if there is room data
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

          <Button type="submit">UPDATE</Button>
        </form>
      )}
    </Fragment>
  );
};

export default UpdateRoom;
