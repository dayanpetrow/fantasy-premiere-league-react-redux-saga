import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import * as urls from "../../constants/urls";
import Loader from "../Loader/Loader";
//import "./NotFound.css";

class PlayerPageSingle extends Component {
  componentDidMount() {
    this.props.fetchPlayer(this.props.match.params.playerId);
    this.props.changeView();
  }

  render() {
    if (!this.props.player_history || !this.props.all_data) {
      return <Loader />;
    }

    return (
      <div className="not-found">
        <h3>
          {this.props.player_stats.first_name}{" "}
          {this.props.player_stats.second_name}{" "}
        </h3>
        <h1>{this.props.match.params.playerId}</h1>
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
    player_stats: state.response
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
