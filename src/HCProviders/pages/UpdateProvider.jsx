//This component is responsible for updating provider data

//imports
import { useState, useEffect, useContext, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import { useHttp } from "../../Shared/Components/hooks/http-hook";
import { AuthContext } from "../../Shared/Components/context/auth-context";

import classes from "./ProviderForm.module.css";

//This component renders a form to then update provider data with.
//This component sends a GET request to display existing data from the database
//Along with sending a patch request to update the provider data
const UpdateProvider = (props) => {
  //get access to auth context
  const auth = useContext(AuthContext);
  //get access to the send request method from our custom usehttp hook
  const { sendRequest } = useHttp();
  //usestate calls for provider data
  const [providerData, setProviderData] = useState({
    name: "",
    role: "",
    description: "",
  });

  //get provider id from url parameters and access to the history object from usehistory (so we can redirect users)
  const history = useHistory();
  const providerId = useParams().providerId;

  //Use effect call to populate the form with existing provider data
  //This is a http GET request with a dynamically set url, which gets passed the provider id as a parameter,
  //this ensures the correct provider data is displayed
  //This use effect call renders on page load and whenever its dependancies change
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/providers/${providerId}`
        );
        setProviderData({
          name: responseData.provider.name,
          role: responseData.provider.role,
          description: responseData.provider.description,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlace();
  }, [sendRequest, providerId, setProviderData]);

  //If no provider data render a header
  if (!providerData) {
    return (
      <div className="center">
        <h2>Could not find provider</h2>
      </div>
    );
  }

  //handler functions to store user input into state
  const updateNameHandler = (event) => {
    setProviderData({
      ...providerData,
      name: event.target.value,
    });
  };

  const updateRoleHandler = (event) => {
    setProviderData({
      ...providerData,
      role: event.target.value,
    });
  };

  const updateDescriptionHandler = (event) => {
    setProviderData({
      ...providerData,
      description: event.target.value,
    });
  };

  //Handler function for form submission
  //async as http requests are asynchronous
  const providerSubmitHandler = async (event) => {
    //Event prevent default to prevent page reload
    event.preventDefault();

    //try catch as these http requests can fail
    try {
      //send PATCH request to the same url as the GET request prior,
      //providing the provider data values, which are JSON stringified to convert them into JSON
      await sendRequest(
        `http://localhost:5000/api/providers/${providerId}`,
        "PATCH",
        JSON.stringify({
          name: providerData.name,
          role: providerData.role,
          description: providerData.description,
        }),
        //Content headers to JSON as the backend expects json
        //Auth token provided, no token would prevent this request from completing
        //This is to prevent unauthorized users from sending http requests to the backend
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      //redirect user to /providers
      history.push("/providers");
    } catch (err) {
      console.log(err);
    }
  };

  //Form for retrieving user inputs, storing them in state and calling the function to send the http patch request
  //This form is only rendered if there is provider data
  return (
    <Fragment>
      {providerData && (
        <form
          className={classes["provider-form"]}
          onSubmit={providerSubmitHandler}
        >
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            onChange={updateNameHandler}
            value={providerData.name}
          />
          <Input
            id="role"
            element="input"
            type="text"
            label="Role"
            onChange={updateRoleHandler}
            value={providerData.role}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            onChange={updateDescriptionHandler}
            value={providerData.description}
          />
          <Button type="submit">UPDATE</Button>
        </form>
      )}
    </Fragment>
  );
};

export default UpdateProvider;
