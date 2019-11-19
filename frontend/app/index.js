// libraries
import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Bookings from "./pages/Bookings";
import Navbar from "./components/Navbar";

import AppContext from "./context";

import "./app.css";

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider
          value={{
            token: token,
            user: user,
            setToken: setToken,
            setUser: setUser
          }}
        >
          <header>
            <Navbar />
          </header>
          <main>
            <Switch>
              {!token && <Redirect exact path="/" to="/auth" />}
              {!token && <Redirect exact path="/bookings" to="/auth" />}
              {token && <Redirect exact path="/" to="/events" />}
              {token && <Redirect exact path="/auth" to="/events" />}
              <Route path="/events">
                <Events />
              </Route>
              <Route path="/bookings">
                <Bookings />
              </Route>
              {!token && (
                <Route path="/auth">
                  <Auth />
                </Route>
              )}
            </Switch>
          </main>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
