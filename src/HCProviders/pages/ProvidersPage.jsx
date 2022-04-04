import { Fragment, useState, useEffect } from "react";

import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/FormElements/Button";
import NewProvider from "./NewProvider";
import ProvidersList from "../components/ProvidersList";
import { useHttp } from "../../Shared/Components/hooks/http-hook";

import classes from "./ProviderForm.module.css";

const ProvidersPage = () => {
  const [providerInfo, setProviderInfo] = useState();
  const [showProviders, setShowProviders] = useState(true);
  const { sendRequest } = useHttp();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/providers"
        );
        setProviderInfo(responseData.providers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProviders();
  }, [sendRequest]);

  const addProviderHandler = (providerData) => {
    setProviderInfo((prevData) => {
      return [providerData, ...prevData];
    });
    console.log(providerData);
  };

  const showProviderListHandler = (event) => {
    setShowProviders(true);
  };

  const hideProviderListHandler = () => {
    setShowProviders(false);
  };

  const providerDeletedHandler = (deletedProviderId) => {
    setProviderInfo((prevProviders) =>
      prevProviders.filter((provider) => provider.id !== deletedProviderId)
    );
  };

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
