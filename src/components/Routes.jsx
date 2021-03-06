import React, { useState } from "react";
import Auth from "../RoutesContainer/components/Auth.jsx";
import Login from "../RoutesContainer/components/LogIn.jsx";
import SignUp from "../RoutesContainer/components/SignUp.jsx";
import Home from "../RoutesContainer/components/Home.jsx";
import { Switch, Route, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

export const isLoadingContext = React.createContext();

function Routes() {
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingvalue = { isLoading, setIsLoading };

  const [cookies] = useCookies(["x_auth"]);

  return (
    <div>
      <isLoadingContext.Provider value={isLoadingvalue}>
        {cookies.x_auth !== undefined ? (
          <Redirect to="/home" />
        ) : (
          <Redirect to="/" />
        )}

        <Switch>
          <Route exact path="/" component={Auth} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route
            render={({ location }) => {
              return (
                <>
                  <h1>404 ERROR</h1>
                  <p>Not found URL : {location.pathname}</p>
                </>
              );
            }}
          />
        </Switch>
      </isLoadingContext.Provider>
    </div>
  );
}

export default Routes;
