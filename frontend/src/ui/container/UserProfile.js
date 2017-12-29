import React, {Component} from 'react';
import {connect} from 'react-redux';

export class UserProfile extends Component {

  render() {
    return (
      <div>
        <h1>My Profile</h1>
        <div className="container">
          <h3>Hello, {this.props.username}!</h3>
        </div>
      </div>
    )
  }
}

export default connect(
  ({authentication}) => ({username: authentication.username})
)(UserProfile);
