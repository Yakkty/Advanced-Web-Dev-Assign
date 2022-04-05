//This component is responsible for rendering every provider in a grid layout, using material ui Grid
//This is achieved by calling the array.map method on the provider data, which will render a Provider child component
//for every provider in the array.
//All relevant data and functions respective to that provider will be passed as props

import { Grid } from "@mui/material/";

// import classes from "./ProvidersList.module.css";
import Provider from "./Provider";

const ProvidersList = (props) => {
  return (

    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 6, md: 12 }}
    >
      {props.providers.map((provider) => (
        <Provider
          key={provider._id}
          id={provider._id}
          name={provider.name}
          role={provider.role}
          description={provider.description}
          image={provider.image}
          onDelete={props.onDeleteProvider}
        />
      ))}
    </Grid>
  );
};

export default ProvidersList;
