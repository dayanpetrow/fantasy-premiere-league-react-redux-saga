import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import { connect } from "react-redux";
import * as actions from "../../actions/actions";
import { Icon } from 'react-icons-kit'
import {home} from 'react-icons-kit/icomoon/home'
import {addressBook} from 'react-icons-kit/icomoon/addressBook'
import {list} from 'react-icons-kit/fa/list'
//import * as urls from '../../constants/urls'

class Navigation extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div className="Navbar">
        <div className="navigation">

          <NavLink to={"/"} exact activeClassName='active' className="navbar-link" key={"home"} >
            <Icon size={'14px'} icon={home} /> Home
          </NavLink>

         <NavLink to={"/players"} activeClassName='active' className="navbar-link" key={"players"} >
            <Icon size={'18px'} icon={addressBook} /> Players
          </NavLink>

          <NavLink to={"/teams"} activeClassName='active' className="navbar-link" key={"teams"} >
            <Icon size={'18px'} icon={list} /> Teams
          </NavLink>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    response: state.response,
    error: state.error,
    view: state.view
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch({ type: actions.INIT_API_REQUEST })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
