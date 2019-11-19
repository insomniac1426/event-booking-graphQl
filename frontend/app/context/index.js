import React from "react";

const AppContext = React.createContext({
  token: null,
  user: null
});

export default AppContext;
