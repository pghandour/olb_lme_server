import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Lob extends Component {
  state = {
    error: null,
    isLoaded: false,
    lobData: []
  }

  render() {
    return (
      <div className='page'>
        <div className='component-title'>Select Line of Business:</div>
        <div className='lob-container'>{this.showLobOptions()}</div>
        <hr />
        <div className='actionBtn-container'>
          <Link to='/'>
            <button type='button' className='actionBtn'>Go Back</button>
          </Link>
        </div>
      </div>
    );
  }

  componentWillMount = () => {
    const url = '/getLobData';

    axios({
      method: 'get',
      url: url,
      mode: 'cors'
    })
      .then(res => {
        this.setState({
          isLoaded: true,
          lobData: res.data
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
    const { error, isLoaded, lobData } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return lobData.map((data, index) => {
        return (
          <Link to={`/category/${data.shortcode}`} key={index}>
            <div className='lob-box'>
              <div className='lob-name'>{data.name}</div>
              <img className='lob-img' src={data.imgPath} alt={data.shortcode} ></img>
            </div>
          </Link>
        )
      });
    }
  }
}

export default Lob;