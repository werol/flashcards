import React, { Component } from 'react';
import {ErrorPanel} from "./ErrorPanel";
import {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  USERNAME,
  PASSWORD,
  getFormField
} from "../../constants/constants";

export default class RegisterForm extends Component {

  state = {
    [FIRST_NAME]: "",
    [LAST_NAME]:  "",
    [EMAIL]:  "",
    [USERNAME]: "",
    [PASSWORD]: ""
  };

  handleInputChange = event => {
    let value = event.target.value;
    let inputName = event.target.name;
    this.setState({[inputName]: value});
  };

  render() {
    const {errorMessage} = this.props;
    const errorPanel = errorMessage ? <ErrorPanel messageKey={errorMessage}/> : null;
    return (
      <div className="register-page">
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            {errorPanel}
            {
              [FIRST_NAME, LAST_NAME, EMAIL, USERNAME, PASSWORD].map(fieldKey => {
                const field = getFormField(fieldKey);
                return <input key={field.name}
                              type={field.type}
                              placeholder={field.placeholder}
                              name={field.name}
                              pattern={field.pattern}
                              onChange={this.handleInputChange}
                              required
                />
              })
            }
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const { register } = this.props;
    register(this.state);
  }
}
