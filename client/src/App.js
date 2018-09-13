import React, { Component } from 'react';
import './App.css';
import FieldsTemplate from './components/FieldsTemplate';
import PreviewTemplate from './components/PreviewTemplate';
import TestingInput from './components/TestingInput';

class App extends Component {
  state = {
    templateName: '',
    data: [],
    expectedFields: [],
    fieldInputs: {},
    listItems: {}
  }

  render() {
    const { templateName } = this.state;

    return (
      <div>
        <TestingInput
          onTemplateNameChange={this.onTemplateNameChange}
          getData={this.getData}
          templateName={templateName}
        />
        <hr />
        {this.showTemplates()}
      </div>
    );
  }

  onTemplateNameChange = (e) => {
    this.setState({
      templateName: e.target.value
    });
  }

  decideExpectedFields = (nodes) => {
    let expectedFields = [];

    nodes.forEach(node => {
      expectedFields.push({ tagName: node.tagName, dataName: node.dataName });
      if (node.dataName2 !== undefined) {
        expectedFields.push({ tagName: node.tagName, dataName: node.dataName2 });
      }
    });
    return expectedFields;
  }

  getData = (e) => {
    e.preventDefault();

    fetch(`/getData/${this.state.templateName}.html`, {
      mode: "cors",
    })
      .then(res => res.json())
      .then(result => {
        console.log("Received data => ", result);
        console.log('--------------------------------------------------------');

        const expectedFields = this.decideExpectedFields(result);
        const defaultInputs = this.initializeInputs(expectedFields);
        const defaultLists = this.initializeLists(result);

        this.setState({
          templateName: '',
          data: result,
          expectedFields: expectedFields,
          fieldInputs: defaultInputs,
          listItems: defaultLists
        });
      });
  }

  showTemplates = () => {
    const { expectedFields, fieldInputs, data, listItems } = this.state;

    if (data.length > 0) {
      return (
        <div className='edit-template-container'>
          <PreviewTemplate
            data={data}
            fieldInputs={fieldInputs}
            listItems={listItems}
          />
          <FieldsTemplate
            expectedFields={expectedFields}
            onFieldInputChange={this.onFieldInputChange}
            fieldInputs={fieldInputs}
            addNewItem={this.addNewItem}
            listItems={listItems}
            onListItemChange={this.onListItemChange}
            deleteItem={this.deleteItem}
          />
        </div>
      );
    } else { return null; }
  }

  /*
    fieldInputs = {
      'header1': 'This is title'
    }
  */
  onFieldInputChange = (e) => {
    let newInputs = this.state.fieldInputs;
    const updateId = e.target.id;
    const updateValue = e.target.value;

    newInputs[updateId] = updateValue;

    this.setState({
      fieldInputs: newInputs
    })
  }

  onListItemChange = (e) => {
    const itemId = e.target.id;
    const listName = e.target.name;
    const newValue = e.target.value;

    let updateListItems = this.state.listItems;
    updateListItems[listName][itemId] = newValue;

    this.setState(state => ({
      listItems: updateListItems
    }));
  }

  initializeInputs = (expectedFields) => {
    let initialValues = {};
    const numOfInputs = expectedFields.length;

    for (let i = 0; i < numOfInputs; i++) {
      let key = expectedFields[i].dataName;
      initialValues[key] = '';
    }

    return initialValues;
  }

  initializeLists = (data) => {
    let initialValues = {};
    const numOfInputs = data.length;

    for (let i = 0; i < numOfInputs; i++) {
      let tag = data[i].tagName;

      if (tag === 'ol' || tag === 'ul') {
        let key = data[i].dataName;
        initialValues[key] = [];
      }
    }

    return initialValues;
  }

  addNewItem = (e) => {
    e.preventDefault();

    const updateName = e.target.name;
    const updateValue = this.state.fieldInputs[updateName];

    if (!updateValue.length) {
      return;
    }

    // add item to listItems
    let listItems = this.state.listItems;

    listItems[updateName].push(updateValue);

    // clear the text from input field
    let currentInputs = this.state.fieldInputs;

    currentInputs[updateName] = '';

    this.setState(state => ({
      listItems: listItems,
      fieldInputs: currentInputs
    }));
  }

  deleteItem = (e) => {
    const itemId = e.target.id;
    const listName = e.target.name;

    let updateListItems = this.state.listItems;
    updateListItems[listName].splice(itemId, 1);

    this.setState(state => ({
      listItems: updateListItems
    }));
  }
}

export default App;
