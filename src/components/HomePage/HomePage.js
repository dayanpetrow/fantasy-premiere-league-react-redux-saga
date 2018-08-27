import React, { Component } from "react";
import "./HomePage.css";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import * as urls from "../../constants/urls";
import DreamTeam from "../DreamTeam/DreamTeam";
import NextFixtures from "../NextFixtures/NextFixtures";
import { Icon } from "react-icons-kit";
import { starFull } from "react-icons-kit/icomoon/starFull";
import { calendar } from "react-icons-kit/fa/calendar";
import Loader from '../Loader/Loader'

class HomePage extends Component {
  componentDidMount() {
    this.props.changeView();
  }
  render() {
    if (!this.props.response) {
      return <Loader />
    }
    const { teams, next_event_fixtures, elements, element_types } = this.props.response;
    return (
      <div className="Home">
        <div className="column">
          <div className="block">
            <div className="block-header">
              <h3 className="block-header__title">
                <Icon size={"24px"} icon={starFull} className="home-page__icon" />
                Dream Team
              </h3>
            </div>
            <div className="content">
              <DreamTeam players={elements} positions={element_types} teams={teams} />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="block">
            <div className="block-header">
              <h3 className="block-header__title">
                <Icon size={"24px"} icon={calendar} className="home-page__icon" />
                Next Fixtures
              </h3>
            </div>
            <div className="content">
              <NextFixtures fixtures={next_event_fixtures} teams={teams} />
            </div>
          </div>
        </div>
      </div>
    );
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
        activeView: urls.HOME_PAGE
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
