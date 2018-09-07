import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import * as urls from "../../constants/urls";
import Loader from "../common/Loader/Loader";
import "./TeamPageSingle.css";
import TeamPageSinglePlayers from "./TeamPageSinglePlayers";
import TeamPageSingleFixtures from "./TeamPageSingleFixtures";
import DifficultyLine from "../common/DifficultyLine/DifficultyLine";

//for testing with no fixtures or past games
const myobj = {
  fixtures: [],
  history: []
};

class TeamPageSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixtures_loaded: false
    };
  }

  componentDidMount() {
    this.props.changeView();
  }

  componentWillUnmount() {
    this.setState({ fixtures_loaded: false });
    this.props.clearFetchedPlayer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (!this.state.fixtures_loaded && this.props.team_players) ||
      prevProps.match.params.teamId !== this.props.match.params.teamId
    ) {
      this.props.fetchPlayer(this.props.team_players[0].id);
      this.setState({ fixtures_loaded: true });
    }
  }

  render() {
    if (!this.props.all_data) {
      return <Loader />;
    }

    const {
      element_types: player_positions,
      teams: all_teams
    } = this.props.all_data;
    const { team_players, team, player_to_get_fixtures } = this.props;
    const { fixtures_loaded } = this.state;

    return (
      <div className="TeamPageSingle">
        <h1 className="team-name-title">
          {team.name} ({team.short_name})
        </h1>
        <div className="difficulty-colored-line">
          {fixtures_loaded && player_to_get_fixtures ? (
            <DifficultyLine data={player_to_get_fixtures} />
          ) : (
            <Loader />
          )}
        </div>
        <div className="team-page-content">
          <div className="column column-left">
            {player_positions.map(position => {
              let players = team_players.filter(
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
            {fixtures_loaded && player_to_get_fixtures ? (
              <TeamPageSingleFixtures
                data={player_to_get_fixtures}
                teams={all_teams}
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
