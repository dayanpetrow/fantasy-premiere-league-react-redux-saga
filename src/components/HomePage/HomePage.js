import React, { Component } from "react";
import "./HomePage.css";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import * as urls from "../../constants/urls";
import DreamTeam from "../DreamTeam/DreamTeam"

class HomePage extends Component {
  componentDidMount() {
    this.props.changeView();
  }
  render() {
    console.log(this.props.response);
    if(!this.props.response) { 
      return <div>no data yet</div>
    }
    
    console.log(
      this.props.response.elements.filter(element => element.in_dreamteam === true)
    )

    const { teams , next_event_fixtures, elements } = this.props.response;
    return (
      <div className="Home">
        <div className="column">
          <div className="block"> 
            <div className="block-header">
              <h3 className="block-header__title">Dream Team</h3>
            </div>
            <div className="content">
              <DreamTeam players={elements} />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="block"> 
            <div className="block-header">
              <h3 className="block-header__title">Next Fixtures</h3>
            </div>
            <div className="content">
              {next_event_fixtures.map(fixture => {
                let team_a = teams[fixture.team_a-1].name
                let team_h = teams[fixture.team_h-1].name
                let key = `${team_a}${team_h}`
                return (
                  <div key={key}>{`${fixture.kickoff_time_formatted} ${team_a} ${team_h}`}</div>
                );
              })}
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
