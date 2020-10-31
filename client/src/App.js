import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Signup from "./Components/Signup.js";
import { Login } from "./Components/Login";
import { Home } from "./Components/Home";
import Header from "./Components/Header.js";
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './actions'

function App() {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <Login axios={"coucou"} />} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={() => <Login axios={"coucou"} />} />
          <Route exact path="/signup" component={Signup} />
          {/* <Route component={Error} /> */}
        </Switch>
      </Router>
    </React.Fragment>
    // <div>
    //   <h1>Counter = {counter}</h1>
    //   <button onClick={() => dispatch(increment(1))}>+</button>
    //   <button onClick={() => dispatch(decrement(1))}>-</button>
    // </div>


  );
}

export default App;
