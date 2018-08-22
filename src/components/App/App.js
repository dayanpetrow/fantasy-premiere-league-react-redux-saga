import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import "./App.css";
import Navigation from "../Nav/Navigation";
import HomePage from "../HomePage/HomePage"
import PlayersPage from "../PlayersPage/PlayersPage"
import Footer from "../Footer/Footer"


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="Content">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/players" component={PlayersPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
