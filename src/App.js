import React, { useState, useCallback, useEffect } from "react";
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

let logoutTimer;

function App() {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);

    //Create an expiration time one hour from token creation or set it to existing expiration date
    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const tokenDuration =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, tokenDuration);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("userData"));
    if (
      storageData &&
      storageData.token &&
      //Token is valid if expiration date is in the future still
      new Date(storageData.expiration) > new Date()
    ) {
      login(
        storageData.userId,
        storageData.token,
        new Date(storageData.expiration)
      );
    }
  }, [login]);

  let routes;

  if (!token) {
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
        <Route path="/providers" exact>
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
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
