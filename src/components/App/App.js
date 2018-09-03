import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import "./App.css";
import Navigation from "../Nav/Navigation";
import HomePage from "../HomePage/HomePage"
import PlayersPage from "../PlayersPage/PlayersPage"
import Footer from "../Footer/Footer"
import NotFound from "../NotFound/NotFound"
import PlayerPageSingle from "../PlayerPageSingle/PlayerPageSingle";
import TeamsPage from "../TeamsPage/TeamsPage";
import TeamPageSingle from "../TeamPageSingle/TeamPageSingle";


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="Content">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/players" component={PlayersPage} />
            <Route exact path="/players/:playerId" component={PlayerPageSingle} />
            <Route exact path="/teams" component={TeamsPage} />
            <Route exact path="/teams/:teamId" component={TeamPageSingle} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}
