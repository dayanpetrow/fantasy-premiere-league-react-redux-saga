import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import * as urls from "../../constants/urls";
import Loader from "../Loader/Loader";
//import "./NotFound.css";

class TeamsPage extends Component {
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
         what
        </h3>
        <h1>what</h1>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    all_data: state.response,
    teams: state.response ? state.response.teams : null,
    error: state.error,
    view: state.view,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeView: () =>
      dispatch({
        type: actions.CHANGE_ACTIVE_VIEW,
        activeView: urls.TEAMS_PAGE
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsPage);
