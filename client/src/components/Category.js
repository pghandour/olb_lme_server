import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      categories: []
    }
  }

  render() {
    return (
      <div className='page'>
        <div className='component-title'>Select Caregory:</div>
        <ul>{this.showCategoryOptions()}</ul>
      </div>
    );
  }

  componentWillMount = () => {
    const url = '/getCategories';

    axios({
      method: 'get',
      url: url,
      mode: 'cors'
    })
      .then(res => {
        this.setState({
          isLoaded: true,
          categories: res.data
        });
      })
      .catch(error => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  showCategoryOptions = () => {
    const { error, isLoaded, categories } = this.state;
    const lobChoice = this.props.match.params.lob;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return categories.map((category, index) => {
        return (
          <li key={index}>
            <Link to={`/select-template/${lobChoice}/${category.shortcode}`} className='category-name'>{category.name}</Link>
          </li>
        )
      });
    }
  }
}

export default Category;