import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Header";
import Navigation from './components/Navigation';

import Home from "./pages/Home"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Conversation from "./pages/Conversation";

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
          <Route exact path="/register" component={Register} />
          <Route exact path="/conversation/:id" component={Conversation} />
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
