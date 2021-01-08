import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./components/Header/Header";
import { HomePage } from "./components/HomePage/HomePage";
import { ListMovie } from "./components/ListMovie/ListMovie";
import { SignInUp } from "./components/SignInUp/SignInUp";
import { PlayerPage } from "./components/PlayerPage/PlayerPage";
import { Profil } from "./components/Profil/Profil";
// import { ActivateUser } from "./components/ActivateUser/ActivateUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/Style.scss";
import { ResetPasswordEmail } from "./components/ResetPassword/ResetPasswordEmail";
import { ResetPassword } from "./components/ResetPassword/ResetPassword";
import { ErrorPage } from "./components/ErrorPage/ErrorPage"

//INITIALIZE CONTEXT
export const AppContext = createContext();

axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

function App() {
  const [logged, setLogged] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await axios.get("/auth/is_logged");
      const auth = response.data;
      setLogged(auth.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (logged)
    return (
      <React.Fragment>
        <Router>
          <AppContext.Provider value={{ logged, setLogged }}>
            <Header />
            <Switch>
              <Route exact path="/HomePage" component={() => <HomePage />} />
              <Route exact path="/ListMovie" component={() => <ListMovie />} />
              <Route exact path="/PlayerPage" component={() => <PlayerPage />} />
              <Route exact path="/Profil" component={() => <Profil />} />
              <Route path="/ErrorPage" component={() => <ErrorPage />} />
              <Route path="/" component={() => <HomePage />} />
            </Switch>
          </AppContext.Provider>
        </Router>
      </React.Fragment>
    );
  else {
    return (
      <React.Fragment>
        <Router>
          <AppContext.Provider value={{ logged, setLogged }}>
            <Header />
            <Switch>
              <Route exact path="/ResetPasswordEmail" component={() => <ResetPasswordEmail />} />
              <Route exact path="/ResetPassword" component={() => <ResetPassword />} />
              <Route path="/" component={() => <SignInUp />} />
              <Route path="/ErrorPage" component={() => <ErrorPage />} />
            </Switch>
          </AppContext.Provider>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
