import React, { Component } from 'react';

class TestingInput extends Component {
  getData = (e) => {
    this.props.getData(e);
  }

  onChange = (e) => {
    this.props.onTemplateNameChange(e);
  }

  render() {
    const { templateName } = this.props;

    return (
      <form onSubmit={this.getData}>
        <input
          onChange={this.onChange}
          value={templateName}
        />
        <p>Template Name: {templateName}</p>
        <button>Generate Template</button>
      </form>
    );
  }
}

export default TestingInput;