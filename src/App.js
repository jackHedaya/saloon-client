import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./components/Navigation";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route>Saloon</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
