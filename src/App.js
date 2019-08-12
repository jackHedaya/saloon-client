import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Header";
import Navigation from './components/Navigation';

import Home from "./pages/Home"
import Login from "./pages/Login";

import "./App.scss"

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Navigation />
        <div className="content">
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
