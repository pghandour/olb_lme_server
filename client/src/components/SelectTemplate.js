import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class SelectTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      templateImages: []
    }
  }

  render() {
    return (
      <div className='page'>
        <div className='component-title'>Select Template:</div>
        <div>{this.showLobOptions()}</div>
      </div>
    );
  }

  componentWillMount = () => {
    const category = this.props.match.params.category;
    const lob = this.props.match.params.lob;
    const url = `/getTemplateImg/${lob}/${category}`;

    axios({
      method: 'get',
      url: url,
      mode: 'cors'
    })
      .then(res => {
        this.setState({
          isLoaded: true,
          templateImages: res.data
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  showLobOptions = () => {
    const { error, isLoaded, templateImages } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return templateImages.map((img, index) => {
        return (
          <div key={index}>
            <Link to={`/edit-template/${img.templateName}`}><button hidden ref={img.templateName}></button></Link>
            <img src={img.imgPath} alt={img.templateName} onClick={this.onImgClick}></img>
          </div>
        )
      });
    }
  }

  onImgClick = (e) => {
    e.preventDefault();
    const templateName = e.target.alt;
    this.refs[templateName].click();
  }
}

export default SelectTemplate;