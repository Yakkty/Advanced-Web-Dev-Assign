//This is the parent component displaying all data and components revolving around rooms in the website

//imports
import { Fragment, useEffect, useState } from "react";

import Card from "../../Shared/Components/UIElements/Card";
import RoomsList from "../components/RoomsList";
import { useHttp } from "../../Shared/Components/hooks/http-hook";

import classes from "./RoomPage.module.css";

//This component displays a child component rooms list, which retrieves its data from a database
const RoomPage = () => {
  //useState call
  const [roomData, setRoomData] = useState([]);
  //Getting sendrequest method from our custom useHttp hook
  const { sendRequest } = useHttp();

  //UseEffect call to render all room data initially on page load or whenever sendrequest fires
  // This call sends a GET http request to the rest api backend, which then serves all data regarding rooms from the database
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/rooms"
        );

        //the response data is stored in state which can then be passed down to child components to render data
        setRoomData(responseData.rooms);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRooms();
  }, [sendRequest]);

  //These helper constants are utilised to display a dynamic value of the current number of available rooms

  //This converts the values of roomdata which are stored in state, into an array using the spread operator
  const roomAvailabilityArray = [...roomData, []];

  //This filters the array based on rooms that have the attribute of "Available"
  const filteredRoomAvailabilityArray = roomAvailabilityArray.filter((room) => {
    return room.roomAvailability === "Available";
  });

  //This array length is then converted to a string to be displayed in the page, which tells the user how many rooms are available
  const numberOfAvailableRooms =
    filteredRoomAvailabilityArray.length.toString();

    //This is the markup for the rooms page
    //This displays the building name, total number of rooms and total number of available rooms in the clinic
    //The page then will display the rooms list IF there are rooms to display
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
