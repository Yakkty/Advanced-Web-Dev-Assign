import { Fragment, useState } from "react";

// import image from "../../Assets/male doctor.jpg";
import image2 from "../../Assets/female doctor.jpg";

import Card from "../../Shared/Components/UIElements/Card";
import Button from "../../Shared/Components/FormElements/Button";
import NewProvider from "./NewProvider";
import ProvidersList from "../components/ProvidersList";
import classes from "./ProviderForm.module.css";

const DUMMY_PROVIDERS = [
  {
    id: "pv1",
    name: "Tom",
    role: "Doctor",
    description:
      "This is a description of a medical professional, they do xyz haha hehe",
    image: image2,
  },
  {
    id: "pv2",
    name: "Thomas",
    role: "Nurse",
    description:
      "This is a description of a medical professional, they do xyz haha hehe",
    image: image2,
  },
  {
    id: "pv3",
    name: "Baz",
    role: "Surgeon",
    description:
      "This is a description of a medical professional, they do xyz haha hehe",
    image: image2,
  },
  {
    id: "pv4",
    name: "Bazo",
    role: "Doctor",
    description:
      "This is a description of a medical professional, they do xyz haha hehe",
    image: image2,
  },
  {
    id: "pv5",
    name: "Bazo",
    role: "Doctor",
    description:
      "This is a description of a medical professional, they do xyz haha hehe",
    image: image2,
  },
  {
    id: "pv6",
    name: "Bazo",
    role: "Doctor",
    description:
      "This is a description of a medical professional, they do xyz haha hehe",
    image: image2,
  },
];

const ProvidersPage = () => {
  const [providerInfo, setProviderInfo] = useState(DUMMY_PROVIDERS);
  const [showProviders, setShowProviders] = useState(true);

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
      {showProviders && <ProvidersList providers={providerInfo} />};
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
