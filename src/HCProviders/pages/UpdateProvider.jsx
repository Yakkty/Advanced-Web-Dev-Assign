import { useState, useEffect, useContext, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import { useHttp } from "../../Shared/Components/hooks/http-hook";
import { AuthContext } from "../../Shared/Components/context/auth-context";

import classes from "./ProviderForm.module.css";

const UpdateProvider = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttp();
  const [providerData, setProviderData] = useState({
    name: "",
    role: "",
    description: "",
  });

  const history = useHistory();
  const providerId = useParams().providerId;

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

  if (!providerData) {
    return (
      <div className="center">
        <h2>Could not find provider</h2>
      </div>
    );
  }

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

  const providerSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:5000/api/providers/${providerId}`,
        "PATCH",
        JSON.stringify({
          name: providerData.name,
          role: providerData.role,
          description: providerData.description,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/providers");
    } catch (err) {
      console.log(err);
    }
  };

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
