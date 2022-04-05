//This is the parent component which displays all content regarding healthcare providers

//imports
import { Fragment, useState, useEffect } from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/FormElements/Button";
import NewProvider from "./NewProvider";
import ProvidersList from "../components/ProvidersList";
import { useHttp } from "../../Shared/Components/hooks/http-hook";

import classes from "./ProviderForm.module.css";

//This component will render provider information, accessed via a database
const ProvidersPage = () => {
  //UseState calls for storing provider data
  const [providerInfo, setProviderInfo] = useState();
  //helper state to render provider data or new providers form
  const [showProviders, setShowProviders] = useState(true);
  //Send request method from our custom usehttp hook
  const { sendRequest } = useHttp();

  //Use effect call to fetch provider data from the database with a GET http request
  //This will be called on a pages initial render, and if  sendrequest or setproviderinfo changes
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/providers"
        );
        //Store this response data in state
        setProviderInfo(responseData.providers);
      } catch (err) {
        //log errors
        console.log(err);
      }
    };
    fetchProviders();
  }, [sendRequest, setProviderInfo]);

  //Handler function for adding providers
  //This function is dependent on the previous state snapshot, which we gain access to from ...PrevData
  //We can then add the new provider after
  const addProviderHandler = (providerData) => {
    setProviderInfo((prevData) => {
      return [...prevData, providerData];
    });
    console.log(providerData);
  };

  //Helper functions to display the provider data or the add provider data form
  const showProviderListHandler = (event) => {
    setShowProviders(true);
  };

  const hideProviderListHandler = () => {
    setShowProviders(false);
  };

  //handle function to remove providers, this is strictly for updating state on the frontend
  //This returns an array with every item whose id is not equal to the deleted provider id, which is passed as an argument
  const providerDeletedHandler = (deletedProviderId) => {
    setProviderInfo((prevProviders) =>
      prevProviders.filter((provider) => provider.id !== deletedProviderId)
    );
  };

  //This displays either the providers list element if provider data exists, or will display the new provider form
  //This alternates based on the button to show providers or register new providers
  //The provider data and delete provider functions as passed to te providers list
  return (
    <Fragment>
      <Card className={classes["new-provider"]}>
        <div className={classes["new-provider__actions"]}>
          <h2>Healthcare Providers</h2>
          {!showProviders && (
            <Button onClick={showProviderListHandler}>
              Show Healthcare Providers
            </Button>
          )}
          {showProviders && (
            <Button onClick={hideProviderListHandler}>Register</Button>
          )}
        </div>
      </Card>
      {showProviders && providerInfo && (
        <ProvidersList
          providers={providerInfo}
          onDeleteProvider={providerDeletedHandler}
        />
      )}
      ;
      {!showProviders && (
        <NewProvider
          onSaveProviderData={addProviderHandler}
          onRegister={showProviderListHandler}
        />
      )}
    </Fragment>
  );
};

export default ProvidersPage;
