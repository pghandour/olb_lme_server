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
    fileTypes: ['text/html', 'image/*'],
    error: null,
    isLoaded: false,
    lobOptions: [],
    categoryOptions: [],
    uploadSuccess: false,
    images: [],
    htmls: []
  }

  render() {
    const { selectedLob, selectedCategory, fileTypes } = this.state;

    return (
      <div className='page'>
        <div className='component-title'>Add New Template:</div>
        {this.showSuccessMessage()}
        <div className='selectContainer'>
          <select
            value={selectedLob}
            onChange={this.handleChange}
            name='lob'
            className='selectBox'
          >
            <DefaultOpiton text={'Choose Line of Business:'} />
            {this.showLobOptions()}
          </select>
          <select
            value={selectedCategory}
            onChange={this.handleChange}
            name='category'
            className='selectBox'
          >
            <DefaultOpiton text={'Choose Category:'} />
            {this.showCategoryOptions()}
          </select>
        </div>
        <UploadBox fileTypes={fileTypes} updateFiles={this.updateFiles} />
        <ol className='selectedFileList'>
          <div id='fileList-title'>Selected Files:</div>
          {this.showSelectedFiles()}
        </ol>
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

  showSuccessMessage = () => (
    this.state.uploadSuccess ?
      <div className="successMsg">
        <strong>Success!</strong> All files have been uploaded to the server.
      </div>
      : null
  )

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
    let selectedFiles = this.state.files;
    let imagesToUpload = this.state.images;
    let htmlsToUpload = this.state.htmls;
    const { fileTypes } = this.state;

    for (let i = 0, len = files.length; i < len; i++) {
      if (this.validFileType(files[i]) && !this.checkDuplicateFiles(selectedFiles, files[i].name)) {
        selectedFiles.push(files[i]);

        // if the file type is image, save to state "images"
        if (files[i].type.slice(0, 6) === 'image/') {
          imagesToUpload.push(files[i]);
        } else {
          htmlsToUpload.push(files[i]);
        }
      }
    }
    this.setState({ files: selectedFiles });
  }

  validFileType = (file) => {
    const { fileTypes } = this.state;

    for (let i = 0, len = fileTypes.length; i < len; i++) {
      if (file.type === fileTypes[i]) {
        return true;
      } else if (file.type.slice(0, 6) === fileTypes[i].slice(0, 6)) {
        // if file is an image type
        return true;
      }
    }

    return false;
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
    const {
      selectedLob,
      selectedCategory,
      lobIsSelected,
      categoryIsSelected,
      images,
      htmls
    } = this.state;

    const urlUploadTemplates = '/uploading/templates';
    const urlUploadTemplateImages = '/uploading/templateimages';
    const urlHtml2Json = `/uploading/html2json/${selectedLob}/${selectedCategory}`;

    if (lobIsSelected && categoryIsSelected
      && images.length > 0 && htmls.length > 0
      && images.length === htmls.length
    ) {
      this.sendImages(urlUploadTemplateImages, images).then((imagesPath) => {
        this.sendHtmls(urlUploadTemplates, htmls).then((response) => {
          this.convertFiles2Json(urlHtml2Json, response, imagesPath).then(() => {
            this.removeAllFiles();
            this.setState({ uploadSuccess: true });
            <Link to="/">
              <button type='button'>OLB LME Template Generator</button>
            </Link>
            setTimeout(() => {
              this.setState({ uploadSuccess: false });
            }, 3000);
          });
        });
      });
    } else if (!lobIsSelected) {
      alert('Please select "Line of Business"');
    } else if (!categoryIsSelected) {
      alert('Please select "Category"');
    } else {
      alert('Please choose correct images and HTMLs with same name and amount');
    }
  }

  sendHtmls(url = ``, htmls) {
    const len = htmls.length;

    if (len > 0) {
      let formData = new FormData();

      for (let i = 0; i < len; i++) {
        formData.append('templates', htmls[i]);
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

  sendImages(url = ``, images) {
    const len = images.length;

    if (len > 0) {
      let formData = new FormData();

      for (let i = 0; i < len; i++) {
        formData.append('templateimages', images[i]);
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

  convertFiles2Json(url = ``, htmlNames, imagesPath) {
    const data = {
      htmlNames: htmlNames,
      imagesPath: imagesPath
    };

    return fetch(url, {
      method: 'POST',
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.text())
      .then(result => result)
      .catch(error => console.error('Error =>', error));
  }

  removeAllFiles = () => {
    this.setState({ files: [], htmls: [], images: [] });
  }

  showSelectedFiles = () => {
    const { files } = this.state;

    if (files.length === 0) {
      return (<div id='fileList-nofile'>No file selected</div>);
    } else {
      return files.map((file, index) => {
        return (
          <li key={index} ref={file.name} className='fileItems'>
            {`${file.name} (${this.returnFileSize(file.size)})`}
            <button className='btnRemoveFile' onClick={this.onRemoveFile} name={file.name}>&times;</button>
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
    const { files, images, htmls } = this.state;

    for (let i = 0, j = 0, k = 0; i < files.length; i++) {
      console.log(i, j, k);

      if (files[i].name === fileName) {
        if (files[i].type.slice(0, 6) === 'image/') {
          images.splice(j, 1);
        } else {
          htmls.splice(k, 1);
        }

        files.splice(i, 1);
        break;
      }

      if (files[i].type.slice(0, 6) === 'image/') {
        j++;
      } else {
        k++;
      }
    }
    this.setState({
      files: files,
      images: images,
      htmls: htmls
    });
  }
}

export default AddTemplate;

const DefaultOpiton = (props) => (
  <option value='' disabled={true} hidden={true}>{props.text}</option>
);