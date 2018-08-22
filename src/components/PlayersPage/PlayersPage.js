import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import * as urls from "../../constants/urls";

class PlayersPage extends Component {
  componentDidMount() {
    this.props.changeView();
  }
  render() {
    if (!this.props.response) {
      return <div>no data yet</div>
    }

    const { elements: players } = this.props.response;

    return (
        <div className="Players">
            {players.map(player => {
                let full_name = `${player.first_name} ${player.second_name}`
                let points = player.total_points
                let minutes = player.minutes
                let ppg = player.points_per_game
                
                return <div>{full_name} </div>
            })}
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    response: state.response,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeView: () =>
      dispatch({
        type: actions.CHANGE_ACTIVE_VIEW,
        activeView: urls.PLAYERS_PAGE
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersPage);
