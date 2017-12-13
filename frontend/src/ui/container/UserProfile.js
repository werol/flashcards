import React, {Component} from 'react';
import {connect} from 'react-redux';

export class UserProfile extends Component {

  render() {
    return (
      <div>
        <h2>Hello {this.props.username}!</h2>
      </div>
    )
  }
}

export default connect(
  ({authentication}) => ({username: authentication.username})
)(UserProfile);
