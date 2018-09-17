import React, { Component } from 'react';

class Category extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.match)
  }

  render() {
    return (
      <div>
        <div className='component-title'>Category Page</div>
      </div>
    );
  }
}

export default Category;