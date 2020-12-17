import React from "react";
import axios from "axios";
import { Header } from "./components/Header/Header";
import { HomePage } from "./components/HomePage/HomePage";
import { ListMovie } from "./components/ListMovie/ListMovie";
import { SignInUp } from "./components/SignInUp/SignInUp";
import { PlayerPage } from "./components/PlayerPage/PlayerPage";
import { Profil } from "./components/Profil/Profil";
import { ActivateUser } from "./components/ActivateUser/ActivateUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./assets/Style.scss";

axios.defaults.baseURL = "http://localhost:5000/api/v1";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <SignInUp />} />
          <Route exact path="/HomePage" component={() => <HomePage />} />
          <Route path="/ListMovie" component={() => <ListMovie />} />
          <Route path="/PlayerPage" component={() => <PlayerPage />} />
          <Route exact path="/Profil" component={() => <Profil />} />
          <Route exact path="/activateUser" component={() => <ActivateUser />} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
