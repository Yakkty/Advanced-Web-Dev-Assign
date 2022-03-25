import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Home from "./Home/Pages/Home";
import MainNavigation from "./Shared/Components/Navigation/MainNavigation";
import PatientsPage from "./Patients/pages/PatientsPage";
import RoomPage from "./Rooms/pages/RoomPage";
import ProvidersPage from "./HCProviders/pages/ProvidersPage";
import NewPatients from "./Patients/pages/NewPatients";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/patients" exact>
            <PatientsPage />
          </Route>
          <Route path="/patients/new">
            <NewPatients />
          </Route>
          <Route path="/patients/:patientId"></Route>
          <Route path="/provider">
            <ProvidersPage />
          </Route>
          <Route path="/provider/new"></Route>
          <Route path="/provider/:providerId"></Route>
          <Route path="/rooms">
            <RoomPage />
          </Route>
          <Route path="/auth"></Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
