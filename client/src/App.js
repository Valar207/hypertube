import React, { createContext, useState } from "react";
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

//INITIALIZE CONTEXT
export const AppContext = createContext();

axios.defaults.baseURL = "http://localhost:5000/api/v1";

function App() {
  const [logged, setLogged] = useState(false);
  return (
    <React.Fragment>
      <Router>
        <AppContext.Provider value={logged}>
          <Header />
          <Switch>
            <Route exact path="/" component={() => <SignInUp />} />
            <Route exact path="/HomePage" component={() => <HomePage />} />
            <Route path="/ListMovie" component={() => <ListMovie />} />
            <Route path="/PlayerPage" component={() => <PlayerPage />} />
            <Route exact path="/Profil" component={() => <Profil />} />
            <Route exact path="/activateUser" component={() => <SignInUp />} />
          </Switch>
        </AppContext.Provider>
      </Router>
    </React.Fragment>
  );
}

export default App;
