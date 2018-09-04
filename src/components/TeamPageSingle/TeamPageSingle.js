import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import * as urls from "../../constants/urls";
import Loader from "../Loader/Loader";
import "./TeamPageSingle.css";
import TeamPageSinglePlayers from "../TeamPageSinglePlayers/TeamPageSinglePlayers";
import TeamPageSingleFixtures from "../TeamPageSingleFixtures/TeamPageSingleFixtures";
import DifficultyLine from "../DifficultyLine/DifficultyLine";

//for testing with no fixtures or past games
const myobj = {
  fixtures: [],
  history: []
}

class TeamPageSingle extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      fixtures_loaded: false,
      tooltipOpen: false
    };
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  componentDidMount() {
    this.props.changeView();
  }

  componentWillUnmount() {
    this.setState({ fixtures_loaded: false });
    this.props.clearFetchedPlayer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.fixtures_loaded && this.props.team_players) {
      this.props.fetchPlayer(this.props.team_players[0].id);
      this.setState({ fixtures_loaded: true });
    }
  }

  render() {
    if (!this.props.all_data) {
      return <Loader />;
    }

    return (
      <div className="TeamPageSingle">
        <h1 className="team-name-title">
          {this.props.team.name} ({this.props.team.short_name})
        </h1>
        <div className="difficulty-colored-line">
          {this.state.fixtures_loaded && this.props.player_to_get_fixtures ? (
            <DifficultyLine
              data={this.props.player_to_get_fixtures}
              isOpen={this.state.tooltipOpen}
              toggle={this.state.toggle}
            />
          ) : (
            <Loader />
          )}
        </div>
        <div className="team-page-content">
          <div className="column column-left">
            {this.props.all_data.element_types.map(position => {
              let players = this.props.team_players.filter(
                player => player.element_type === position.id
              );
              return (
                <TeamPageSinglePlayers
                  key={position.plural_name}
                  players={players}
                  position={position.plural_name}
                />
              );
            })}
          </div>
          <div className="column column-right">
            {this.state.fixtures_loaded && this.props.player_to_get_fixtures ? (
              <TeamPageSingleFixtures
                data={this.props.player_to_get_fixtures}
                teams={this.props.all_data.teams}
              />
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    all_data: state.response,
    error: state.error,
    view: state.view,
    player_to_get_fixtures: state.player,
    team_players: state.response
      ? state.response.elements.filter(
          player => `${player.team}` === ownProps.match.params.teamId
        )
      : null,
    team: state.response
      ? state.response.teams.find(
          team => `${team.id}` === ownProps.match.params.teamId
        )
      : null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPlayer: playerId =>
      dispatch({
        type: actions.FETCH_PLAYER,
        playerId
      }),
    changeView: () =>
      dispatch({
        type: actions.CHANGE_ACTIVE_VIEW,
        activeView: urls.TEAM_PAGE_SINGLE
      }),
    clearFetchedPlayer: () =>
      dispatch({
        type: actions.CLEAR_FETCHED_PLAYER
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamPageSingle);
