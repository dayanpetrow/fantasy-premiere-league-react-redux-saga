import React, { Component } from "react";
import { INIT_API_REQUEST } from "../../actions/actions"
import "./App.css";

import { connect } from "react-redux";

class App extends Component {

  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    const { fetching, error } = this.props;
    
    return (
      <div className="App">

        {error && <p style={{ color: "red" }}>damn it epl</p>}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    response: state.response,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch({ type: INIT_API_REQUEST })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);