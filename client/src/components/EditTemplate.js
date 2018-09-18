import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import FieldsTemplate from './FieldsTemplate';
import PreviewTemplate from './PreviewTemplate';
import PreviewPage from './PreviewPage';

class EditTemplate extends Component {
  state = {
    templateName: '',
    data: [],
    expectedFields: [],
    fieldInputs: {},
    listItems: {}
  }

  render() {
    const category = this.props.match.params.category;
    const lob = this.props.match.params.lob;

    return (
      <div>
        <div>{this.showTemplates()}</div>
        <hr />
        <div className='actionBtn-container'>
          <button type='button' onClick={this.openPreviewPage} className='actionBtn'>Preview</button>
          <button type='button' onClick={this.downloadPreviewPage} className='actionBtn'>Download</button>
          <Link to={`/select-template/${lob}/${category}`}>
            <button type='button' className='actionBtn'>Go Back</button>
          </Link>
        </div>
      </div>
    );
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

  componentDidMount = () => {
    const url = `/getData/${this.props.match.params.name}`;

    axios({
      method: 'get',
      mode: 'cors',
      url: url
    })
      .then(result => {
        const data = result.data;
        const expectedFields = this.decideExpectedFields(data);
        const defaultInputs = this.initializeInputs(expectedFields);
        const defaultLists = this.initializeLists(data);

        this.setState({
          templateName: '',
          data: data,
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
            listItems={listItems}
            fieldInputs={fieldInputs}
          />
          <FieldsTemplate
            expectedFields={expectedFields}
            fieldInputs={fieldInputs}
            listItems={listItems}
            addNewItem={this.addNewItem}
            deleteItem={this.deleteItem}
            onFieldInputChange={this.onFieldInputChange}
            onListItemChange={this.onListItemChange}
          />
        </div>
      );
    } else { return null; }
  }

  openPreviewPage = (e) => {
    const { fieldInputs, data, listItems } = this.state;
    e.preventDefault();

    const finishedPage =
      <PreviewPage
        data={data}
        fieldInputs={fieldInputs}
        listItems={listItems}
      />

    const html = renderToString(finishedPage);

    const previewWindow = window.open("", '_blank');
    previewWindow.document.write(html);
    previewWindow.document.close();
  }

  downloadPreviewPage = (e) => {
    const { fieldInputs, data, listItems } = this.state;
    e.preventDefault();

    const finishedPage =
      <PreviewPage
        data={data}
        fieldInputs={fieldInputs}
        listItems={listItems}
      />

    const html = renderToString(finishedPage);
    const filename = "template.html";
    this.download(filename, html);
  }

  download = (filename, html) => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(html));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
    e.preventDefault();
    const itemId = e.target.id;
    const listName = e.target.name;

    let updateListItems = this.state.listItems;
    updateListItems[listName].splice(itemId, 1);

    this.setState(state => ({
      listItems: updateListItems
    }));
  }
}

export default EditTemplate;