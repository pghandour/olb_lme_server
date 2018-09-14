import React, { Component } from 'react';

class UploadTemplate extends Component {
  render() {
    return (
      <div>
        <div className='component-title'>Upload Template HTML</div>
        <fieldset>
          <legend>File Uploader</legend>
          <form id="fileUploads" method='POST' encType='multipart/form-data'>
            <input id="selectBtn" type='file' multiple accept='text/html' style={{ 'display': 'none' }} ></input>
            <div id="dropbox">
              <p id="lblDrop">Drag & Drop your files here
                <span id="lblSelect"> (or click to select files)</span>
              </p>
            </div>
            <div id="preview">
              <p id="noFileMessage">No files currently selected for upload</p>
            </div>
            <div>
              <p id="totalFiles">Total Files: 0</p>
              <button id="rmAllBtn" type='button'>Remove All Files</button>
              <button id="uploadBtn" type='button'>Submit</button>
            </div>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default UploadTemplate;