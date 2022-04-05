//App.js is the centre point of the entire website.
//This website is a single page application, so everything consists of a single html page
//With content rerendering.

//Imports
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

//App JS consists of Routing logic and login state information.
function App() {
  //State involving user Ids and tokens (JWT are being utilised for authentication in this application)
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  //Login function. This function binds a token to a user which is used to gain access to the rest of the application
  //useCallback is utilised here so the login function doesn't recreate on component re-renders
  //We only want login to be called once when the user logs in
  const login = useCallback((uid, token, expirationDate) => {
    //Storing the token and user id in state
    setToken(token);
    setUserId(uid);

    //Create an expiration time one hour from token creation or set it to existing expiration date
    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    //Setting the expiration date in state
    setTokenExpirationDate(tokenExpiration);
    //Storing the authentication token and expiration in local storage
    //This allows users to stay logged in for a duration, without having to login every page reload
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  //Logout function to log a user out. This removes the authentication token from the user and removes the expiration timer
  //along with removing the user data from local storage
  //Logout is also in a usecallback hook to prevent it being recreated on component re-renders
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  //This function is used to calculate the expiration time of the token, and automatically log a user out once when the time is up
  //Checking if a token exists (the user has logged in) along with there being an expiration date
  //This function will run once on page render, and any time the token, logout function or token expiration date changes
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const tokenDuration =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, tokenDuration);
    } else {
      //Clear the timer if there is no token or expiration date
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  //This useEffect call is what will automatically log a user in
  //if the storage data has a valid token and valid token expiration timer
  //This will only be called on the pages initial render, and whenever login changes
  useEffect(() => {
    //Parse the data from local storage
    const storageData = JSON.parse(localStorage.getItem("userData"));
    if (
      storageData &&
      storageData.token &&
      //Token is valid if expiration date is in the future still
      new Date(storageData.expiration) > new Date()
    ) {
      //Login function call
      login(
        storageData.userId,
        storageData.token,
        new Date(storageData.expiration)
      );
    }
  }, [login]);

  //This section consists of the routing for the page
  //This utilises a package called react-router-dom
  //Page content will rerender depending on the url
  let routes;

  //If check to see if user is authenticated with a token
  //If a user does not have a token they can only access the login page
  if (!token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  } else {
    //If a user does have a valid token then they have access to the rest of the website
    routes = (
      <Switch>
        <Route path="/" exact>
          <PatientsPage />
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

  // AuthContext is used to manage app wide state, in this case on a users logged in status.
  //A context provider is used here to pass this state to every child component of the app, which in this case is the entire website
  //The rest of the application will have access to the token, userId and login/logout functions

  //MainNavigation is a navigation component rendered alongside with page content.
  //This allows for the navigation bar to be present all the time

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
