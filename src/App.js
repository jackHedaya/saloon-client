import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Header";
import Navigation from './components/Navigation';

import "./App.scss"

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navigation />
        <Switch>
          <Redirect exact from="/" to="/home" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
