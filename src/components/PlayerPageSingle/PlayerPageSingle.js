import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import * as urls from "../../constants/urls";
import Loader from "../common/Loader/Loader";
import DifficultyLine from "../common/DifficultyLine/DifficultyLine";
import "./PlayerPageSingle.css";
import PlayersPageSingleStats from "./PlayersPageSingleResults";
import PlayerPageSingleOverall from "./PlayerPageSingleOverall";
import * as tabs from "../../constants/tabs";

class PlayerPageSingle extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: tabs.HISTORY_TAB };
  }

  switchTab = (e, tab) => {
    e.preventDefault();
    if (tab === this.state.currentTab) return;
    this.setState({ currentTab: tab });
  };

  componentDidMount() {
    this.props.fetchPlayer(this.props.match.params.playerId);
    this.props.changeView();
  }

  render() {
    if (!this.props.player_history || !this.props.all_data) {
      return <Loader />;
    }

    const { player_history, player_fpl_stats, all_data } = this.props;

    const player_full_name =
      player_fpl_stats.first_name + " " + player_fpl_stats.second_name;
    const player_team_name = all_data.teams[player_fpl_stats.team - 1].name;

    let price = (player_fpl_stats.now_cost * 0.1).toFixed(1);
    let price_change = player_fpl_stats.cost_change_start;
    let player_position =
      all_data.element_types[player_fpl_stats.element_type - 1].singular_name;

    console.log(player_fpl_stats, player_history);

    return (
      <div className="PlayerPageSingle">
        <h1 className="PlayerPageSingle__name">
          {player_full_name} ({player_team_name})
        </h1>
        <div className="difficulty-colored-line">
          {player_history ? (
            <DifficultyLine data={player_history} />
          ) : (
            <Loader />
          )}
        </div>
        <div className="PlayerPageSingle__content">
          <div className="column column-left">
            <PlayerPageSingleOverall
              data={player_fpl_stats}
              position={player_position}
            />
          </div>
          <div className="column column-right">
            {player_history ? (
              <PlayersPageSingleStats
                player_data={player_history}
                switchTab={this.switchTab}
                tabToDisplay={this.state.currentTab}
                teams={all_data.teams}
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
    fetching_player: state.fetching_player,
    player_history: state.player,
    error: state.error,
    view: state.view,
    player_fpl_stats: state.response
      ? state.response.elements.find(
          player => `${player.id}` === ownProps.match.params.playerId
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
        activeView: urls.PLAYER_PAGE_SINGLE
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerPageSingle);
