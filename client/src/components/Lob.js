import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

class Lob extends Component {
  render() {
    return (
      <div>
        <div className='component-title'>Line of business Page</div>
        {this.showAddBtn()}
      </div>
    );
  }

  showAddBtn = () => {
    const action = this.props.match.params.action;

    if (action === 'add') {
      return (
        <button onClick={this.onClick}>Add new LOB</button>
      );
    }
  }

  onClick = (e) => {
    e.preventDefault();
    console.log("clicked");

  }
}

export default Lob;