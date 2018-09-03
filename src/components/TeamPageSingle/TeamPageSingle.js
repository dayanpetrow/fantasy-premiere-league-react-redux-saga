import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import * as urls from "../../constants/urls";
import Loader from "../Loader/Loader";
//import "./NotFound.css";

class TeamPageSingle extends Component {
  componentDidMount() {
    this.props.changeView();
  }

  render() {
    if (!this.props.all_data) {
      return <Loader />;
    }

    return (
      <div className="not-found">
        <h3>
          {this.props.team.name}{" "}
        </h3>
        <h1>{this.props.match.params.teamId}</h1>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    all_data: state.response,
    error: state.error,
    view: state.view,
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
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamPageSingle);
