import React, { Component } from 'react';

class UploadBox extends Component {
  render() {
    const { fileTypes } = this.props;
    let acceptFileTypes = '';
    fileTypes.forEach(type => {
      acceptFileTypes += type + ',';
    });

    acceptFileTypes = acceptFileTypes.slice(0, -1);

    return (
      <div
        className='uploadBox'
        onClick={this.onUploadBoxClick}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        <input
          type='file'
          multiple={true}
          accept={acceptFileTypes}
          onChange={this.handleFiles}
          hidden
          ref='fileInput'
        ></input>
        <p id="lblDrop">Drag & Drop
          <span id="lblSelect"> (or click to select files)</span>
        </p>
      </div>
    );
  }

  handleFiles = (e) => {
    const currentFiles = e.target.files;
    this.updateFiles(currentFiles);
  }

  updateFiles = (files) => {
    this.props.updateFiles(files);
  }

  onUploadBoxClick = () => {
    this.refs['fileInput'].click();
  }

  onDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  onDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;
    this.updateFiles(files);
  }
}

export default UploadBox;