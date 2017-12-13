import React, {Component} from "react";

export default class ListComponent extends Component {
  render() {
    const items = this.props.items;
    return (
      <div>
        <h2>Fleshcards</h2>
        <p>
          {items ? JSON.stringify(this.props.items, null, 4) : ""}
        </p>
        <button onClick={this.props.fetchFleshcards}>
          Fetch
        </button>
      </div>
    );
  }
}
