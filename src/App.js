import React, { useState, useCallback } from "react";
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
import UpdatePatient from "./Patients/pages/UpdatePatient";
import RoomPage from "./Rooms/pages/RoomPage";
import UpdateRoom from "./Rooms/pages/UpdateRoom";
import ProvidersPage from "./HCProviders/pages/ProvidersPage";
import UpdateProvider from "./HCProviders/pages/UpdateProvider";
import Auth from "./User/pages/Auth";
import { AuthContext } from "./Shared/Components/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (!isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/patients" exact>
          <PatientsPage />
        </Route>
        <Route path="/patients/:patientId" exact>
          <UpdatePatient />
        </Route>
        <Route path="/provider" exact>
          <ProvidersPage />
        </Route>
        <Route path="/provider/:providerId" exact>
          <UpdateProvider />
        </Route>
        <Route path="/rooms" exact>
          <RoomPage />
        </Route>
        <Route path="/rooms/:roomId" exact>
          <UpdateRoom />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
