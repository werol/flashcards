import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getSession } from "../../reducers/authentication";
import "stylus/main.styl";
import {INDEXED_DB_OBJECT_STORE_NAME, MENU_FOR_GUEST, MENU_FOR_USER, OFFLINE, ONLINE} from "../constants/constants";
import {synchronizeFlashcards} from "../../reducers/synchronize";
import {getAllData} from "../../indexedDB/dbHandler";
import AcceptVersionModal from "../component/AcceptVersionModal";


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

export class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSession();
    window.addEventListener('online',  this.updateOnlineStatus.bind(this, this.props.synchronizeFlashcards));
    window.addEventListener('offline', this.updateOfflineStatus);
  }

  updateOnlineStatus(synchronizeFlashcards) {
    document.getElementById("status").innerHTML = ONLINE;
    getAllData(INDEXED_DB_OBJECT_STORE_NAME)
      .then(result => {
        const flashcardSets = result.map(flashcardSet => {
          const setId = flashcardSet.setId;
          const isSetIdInteger = setId % 1 === 0;
          return {...flashcardSet, setId: isSetIdInteger ? setId : null}
        });
        synchronizeFlashcards(flashcardSets);
      });
  };

  updateOfflineStatus() {
    document.getElementById("status").innerHTML = OFFLINE;
  };

  render() {
    const {isAuthenticated, success, setsNotSynchronized} = this.props;
    const menuItems = isAuthenticated ? MENU_FOR_USER : MENU_FOR_GUEST;

    return (
      <div id="application">
        <TopMenu items={menuItems}/>
        {this.props.children}
        {
          success &&
          setsNotSynchronized.length ?
            <AcceptVersionModal setsNotSynchronized={setsNotSynchronized}/>
            : null
        }
        <span id="status">{ONLINE}</span>
      </div>
    );
  }
}

export default connect(
  state => (
    {
      isAuthenticated: state.authentication.isAuthenticated,
      setsNotSynchronized: state.synchronize.setsNotSynchronized,
      success: state.synchronize.success
    }),
  {getSession, synchronizeFlashcards}
)(App);
