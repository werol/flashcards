import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getSession } from "../../reducers/authentication";
import "stylus/main.styl";
import {MENU_FOR_GUEST, MENU_FOR_USER, OFFLINE, ONLINE} from "../constants/constants";


const TopMenu = (props) => {
  const items = props.items.map((item, key) => (
    <li key={key}>
      <Link to={item.link}>{item.label}</Link>
    </li>
  ));
  return (
    <nav>
      <div className="container-fluid">
        <ul className="nav navbar-nav navbar-right">
          {items}
        </ul>
      </div>
    </nav>
  );
};

const updateOnlineStatus = () => {
  document.getElementById("status").innerHTML = ONLINE;
};

const updateOfflineStatus = () => {
  document.getElementById("status").innerHTML = OFFLINE;
};

export class App extends Component {

  componentDidMount() {
    this.props.getSession();
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOfflineStatus);
  }

  render() {
    const {isAuthenticated} = this.props;
    const menuItems = isAuthenticated ? MENU_FOR_USER : MENU_FOR_GUEST;

    return (
      <div id="application">
        <TopMenu items={menuItems}/>
        {this.props.children}
        <span id="status">{ONLINE}</span>
      </div>
    );
  }
}

export default connect(
  state => ({isAuthenticated: state.authentication.isAuthenticated}),
  {getSession}
)(App);
