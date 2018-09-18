import React, { Component } from 'react';

class FieldsTemplate extends Component {
  render() {
    return (
      <div className='fieldsContainer'>
        <div className='component-title'>Template Controls</div>
        <form className='control-form'>
          {this.renderFields()}
        </form>
      </div>
    );
  }

  renderFields = () => {
    const { expectedFields, fieldInputs, listItems } = this.props;

    return expectedFields.map((node, index) => {
      if (node.tagName === 'p') {
        return (
          <div className='template-field' key={index}>
            <textarea
              id={node.dataName}
              placeholder={node.dataName}
              onChange={this.onChange}
              value={fieldInputs[node.dataName]}
            ></textarea>
          </div>
        );
      } else if (node.tagName === 'ol' || node.tagName === 'ul') {
        return (
          <div className='template-field' key={index}>
            <input
              type='text'
              id={node.dataName}
              placeholder={node.dataName}
              onChange={this.onChange}
              value={fieldInputs[node.dataName]}
              onKeyUp={this.onPressingEnter}
            ></input>
            <button type='button' onClick={this.addNewItem} name={node.dataName} className='btnAddItem' ref={node.dataName}>ADD</button>
            {
              listItems[node.dataName].length > 0 ?
                listItems[node.dataName].map((item, index) => {
                  return (
                    <div key={index} className='listItemInput'>
                      <input
                        type='text'
                        id={index}
                        name={node.dataName}
                        onChange={this.onListItemChange}
                        value={item}
                      ></input>
                      <button type='button' onClick={this.deleteItem} id={index} name={node.dataName}>X</button>
                    </div>
                  )
                })
                : null
            }
          </div>
        );
      } else {
        return (
          <div className='template-field' key={index}>
            <input
              type='text'
              id={node.dataName}
              placeholder={node.dataName}
              onChange={this.onChange}
              value={fieldInputs[node.dataName]}
            ></input>
          </div>
        );
      }
    });
  }

  onChange = (e) => {
    this.props.onFieldInputChange(e);
  }

  addNewItem = (e) => {
    this.props.addNewItem(e);
  }

  // when user press enter key in the list input,
  // simulate the click event for the add button
  onPressingEnter = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      const id = e.target.id;
      this.refs[id].click();
    }
  }

  onListItemChange = (e) => {
    this.props.onListItemChange(e);
  }

  deleteItem = (e) => {
    this.props.deleteItem(e);
  }
}

export default FieldsTemplate;