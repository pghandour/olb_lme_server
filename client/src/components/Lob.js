import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Lob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      lobData: []
    }
  }

  render() {
    return (
      <div className='page'>
        <div className='component-title'>Select Line of Business:</div>
        <div>{this.showLobOptions()}</div>
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
          <div className='lob-box' key={index}>
            <Link to={`/category/${data.shortcode}`} className='lob-name'>
              <button ref={data.shortcode}>{data.name}</button>
            </Link>
            <img className='lob-img' src={data.imgPath} alt={data.shortcode} onClick={this.onClick}></img>
          </div>
        )
      });
    }
  }

  onClick = (e) => {
    e.preventDefault();
    const shortcode = e.target.alt;
    this.refs[shortcode].click();
  }
}

export default Lob;