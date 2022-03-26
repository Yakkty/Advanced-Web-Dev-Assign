import { Grid } from "@mui/material/";

// import classes from "./ProvidersList.module.css";
import Provider from "./Provider";

const ProvidersList = (props) => {
  return (
    // <ul className={classes["patient-list"]}>
    //   {props.patients.map((patient) => (
    //     <Patient
    //       key={patient.id}
    //       image={patient.imageUrl}
    //       name={patient.name}
    //       age={patient.age}
    //       status={patient.status}
    //     />
    //   ))}
    // </ul>
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {props.providers.map((provider) => (
        <Provider
          key={provider.id}
          name={provider.name}
          role={provider.role}
          description={provider.description}
          image={provider.image}
        />
      ))}
    </Grid>
  );
};

export default ProvidersList;