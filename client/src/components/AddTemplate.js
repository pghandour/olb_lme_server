import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import UploadBox from './UploadBox';

class AddTemplate extends Component {
  state = {
    selectedLob: '',
    selectedCategory: '',
    lobIsSelected: false,
    categoryIsSelected: false,
    files: [],
    fileTypes: ['text/html'],
    error: null,
    isLoaded: false,
    lobOptions: [],
    categoryOptions: []
  }

  render() {
    const { selectedLob, selectedCategory, fileTypes } = this.state;

    return (
      <div className='page'>
        <div className='component-title'>Add New Template:</div>
        <select
          value={selectedLob}
          onChange={this.handleChange}
          name='lob'
        >
          <option
            value=''
            disabled={true}
            hidden={true}
          >{'Choose Line of Business:'}</option>
          {this.showLobOptions()}
        </select>
        <select
          value={selectedCategory}
          onChange={this.handleChange}
          name='category'
        >
          <option
            value=''
            disabled={true}
            hidden={true}
          >{'Choose Category:'}</option>
          {this.showCategoryOptions()}
        </select>
        <UploadBox fileTypes={fileTypes} updateFiles={this.updateFiles} />
        <ol>{this.showSelectedFiles()}</ol>
        {this.showBtnSection()}
      </div>
    );
  }

  componentWillMount = () => {
    const url = '/getLobAndCategory';

    axios({
      method: 'get',
      url: url,
      mode: 'cors'
    })
      .then(res => {
        this.setState({
          isLoaded: true,
          lobOptions: res.data.lobOptions,
          categoryOptions: res.data.categoryOptions
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  handleChange = (e) => {
    let selectedValue = e.target.value;

    if (e.target.name === 'lob') {
      this.setState({ selectedLob: selectedValue, lobIsSelected: true });
    } else if (e.target.name === 'category') {
      this.setState({ selectedCategory: selectedValue, categoryIsSelected: true });
    }
  }

  showLobOptions = () => {
    return this.state.lobOptions.map((option, index) => {
      return <option key={index} value={option.shortcode}>{option.name}</option>
    });
  }

  showCategoryOptions = () => {
    return this.state.categoryOptions.map((option, index) => {
      return <option key={index} value={option.shortcode}>{option.name}</option>
    });
  }

  showBtnSection = () => (
    <div className='actionBtn-container'>
      <button
        type='button'
        className='actionBtn'
        onClick={this.removeAllFiles}
      >Remove All Files</button>
      <button
        type='button'
        className='actionBtn'
        onClick={this.onSubmitFiles}
      >Submit</button>
      <Link to='/'>
        <button
          type='button'
          className='actionBtn'
          ref='toHome'
        >Cancel</button>
      </Link>
    </div>
  )

  updateFiles = (files) => {
    let filesToUpload = this.state.files;

    for (let i = 0, len = files.length; i < len; i++) {
      if (!this.checkDuplicateFiles(filesToUpload, files[i].name)) {
        filesToUpload.push(files[i]);
      }
    }
    this.setState({ files: filesToUpload });
  }

  checkDuplicateFiles = (fileList, name) => {
    for (let i = 0, len = fileList.length; i < len; i++) {
      if (fileList[i].name === name) {
        return true;
      }
    }
    return false;
  }

  onSubmitFiles = () => {
    const { files, selectedLob, selectedCategory, lobIsSelected, categoryIsSelected } = this.state;

    if (lobIsSelected && categoryIsSelected && files.length > 0) {
      const sendFilesPromise = this.sendFiles('/uploading/templates', files);
      if (sendFilesPromise) {
        sendFilesPromise.then(res => {
          const convertFiles2JsonPromise =
            this.convertFiles2Json(`/uploading/html2json/${selectedLob}/${selectedCategory}`, res);
          if (convertFiles2JsonPromise) {
            convertFiles2JsonPromise.then((result) => {
              this.removeAllFiles();
              this.refs['toHome'].click();
            });
          }
        });
      }
    } else if (!lobIsSelected) {
      alert('Please select "Line of Business"');
    } else if (!categoryIsSelected) {
      alert('Please select "Category"');
    } else {
      alert('Please choose your files');
    }
  }

  sendFiles(url = ``, data) {
    const len = data.length;

    if (len > 0) {
      let formData = new FormData();

      for (let i = 0; i < len; i++) {
        formData.append('templates', data[i]);
      }

      return fetch(url, {
        method: 'POST',
        body: formData
      })
        .then(res => res.text())
        .then(result => result)
        .catch(error => console.error('Error =>', error));
    }
  }

  convertFiles2Json(url = ``, files) {
    const templates = { templates: files };

    return fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify(templates)
    })
      .then(res => res.text())
      .then(result => result)
      .catch(error => console.error('Error =>', error));
  }

  removeAllFiles = () => {
    this.setState({ files: [] });
  }

  showSelectedFiles = () => {
    const { files } = this.state;

    if (files.length === 0) {
      return (<div>No file selected</div>);
    } else {
      return files.map((file, index) => {
        return (
          <li key={index} ref={file.name}>
            {`${file.name} (${this.returnFileSize(file.size)})`}
            <button onClick={this.onRemoveFile} name={file.name}>X</button>
          </li>
        )
      });
    }
  }

  returnFileSize = (number) => {
    if (number < 1024) {
      return number + ' bytes';
    } else if (number >= 1024 && number < 1048576) {
      return (number / 1024).toFixed(1) + ' KB';
    } else if (number >= 1048576) {
      return (number / 1048576).toFixed(1) + ' MB';
    }
  }

  onRemoveFile = (e) => {
    const fileName = e.target.name;
    const { files } = this.state;

    for (let i = 0; i < files.length; i++) {
      if (files[i].name === fileName) {
        files.splice(i, 1);
      }
    }
    this.setState({ files: files });
  }
}

export default AddTemplate;