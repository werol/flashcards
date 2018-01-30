import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getSession } from "../../reducers/authentication";
import "stylus/main.styl";
import {INDEXED_DB_OBJECT_STORE_NAME, MENU_FOR_GUEST, MENU_FOR_USER, OFFLINE, ONLINE} from "../constants/constants";
import {synchronizeFlashcards} from "../../reducers/synchronize";
import {INDEXED_DB_HANDLER_MODULE} from "../../indexedDB/dbHandler";
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
    const {synchronizeFlashcards} = this.props;
    const _this = this;
    window.addEventListener('online',  this.updateOnlineStatus.bind(this, synchronizeFlashcards, _this));
  }

  updateOnlineStatus(synchronizeFlashcards, _that) {
    INDEXED_DB_HANDLER_MODULE.getAllData(INDEXED_DB_OBJECT_STORE_NAME)
      .then(result => {
        const flashcardSets = result.map(flashcardSet => {
          const setId = flashcardSet.setId;
          const isSetIdInteger = setId % 1 === 0;
          return {...flashcardSet, setId: isSetIdInteger ? setId : null}
        });
        synchronizeFlashcards(flashcardSets, _that.props.version);
      });
  };

  render() {
    const {isAuthenticated, success, setsNotSynchronized, version} = this.props;
    const menuItems = isAuthenticated ? MENU_FOR_USER : MENU_FOR_GUEST;

    return (
      <div id="application">
        <TopMenu items={menuItems}/>
        {this.props.children}
        {
          success &&
          setsNotSynchronized.length ?
            <AcceptVersionModal setsNotSynchronized={setsNotSynchronized} version={version}/>
            : null
        }
        <span id="status">{window.navigator.onLine ? ONLINE : OFFLINE}</span>
      </div>
    );
  }
}

export default connect(
  state => (
    {
      isAuthenticated: state.authentication.isAuthenticated,
      setsNotSynchronized: state.synchronize.setsNotSynchronized,
      version: state.flashcards.version,
      success: state.synchronize.success
    }),
  {getSession, synchronizeFlashcards}
)(App);
