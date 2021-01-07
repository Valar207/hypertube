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
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <React.Fragment>
      <Router>
        <AppContext.Provider value={{logged, setLogged}}>
          <Header />
          <Switch>
            <Route exact path="/" component={() => logged ? <HomePage /> : <SignInUp />} />
            <Route exact path="/HomePage" component={() => <HomePage />} />
            <Route path="/ListMovie" component={() => <ListMovie />} />
            <Route path="/PlayerPage" component={() => logged ? <PlayerPage /> : <HomePage />} />
            <Route exact path="/Profil" component={() => logged ? <Profil /> : <HomePage />} />
            <Route exact path="/activateUser" component={() => logged ? <HomePage /> : <SignInUp />} />
          </Switch>
        </AppContext.Provider>
      </Router>
    </React.Fragment>
  );
}

export default App;
