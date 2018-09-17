import React, { Component } from 'react';

class SelectTemplate extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match)
  }

  render() {
    return (
      <div>
        <div className='component-title'>Select Template Page</div>
      </div>
    );
  }
}

export default SelectTemplate;