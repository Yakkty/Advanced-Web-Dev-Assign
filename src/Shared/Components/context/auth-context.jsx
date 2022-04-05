//This is the context revolved around a users logged in status
//This creates a context object, and it will read the context value from the closest matching provider above it in the tree
//This context describes the parameters around authentication
//i.e if the user is logged in, their user id, the token, along with login and logout functions

import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
