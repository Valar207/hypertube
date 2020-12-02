import React from 'react'
import { Header } from './components/Header/Header'
import { HomePage } from './components/HomePage/HomePage'
import { ListMovie } from './components/ListMovie/ListMovie'
import { SignInUp } from "./components/SignInUp/SignInUp"
import { PlayerPage } from "./components/PlayerPage/PlayerPage"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './assets/Style.scss'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <SignInUp />} />
          <Route exact path="/HomePage" component={() => <HomePage />} />
          <Route exact path="/ListMovie" component={() => <ListMovie />} />
          <Route exact path="/PlayerPage" component={() => <PlayerPage />} />
        </Switch>
      </Router>
    </React.Fragment>



  );
}

export default App;
