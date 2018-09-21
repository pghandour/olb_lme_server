import React, { Component } from 'react';
import axios from 'axios';

class AddCategory extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      shortcode: '',
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { name, description, shortcode } = this.state;

    axios.post('/uploading/add-category', { name, description, shortcode })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  render() {
    const { name, description, shortcode } = this.state;
    return (
        <div>
            Add Category: <br/>
            <form onSubmit={this.onSubmit}>
            Name: <input type="text" name="name" value={name} onChange={this.onChange}/> <br/>
            Description: <input type="text" name="description" value={description} onChange={this.onChange}/> <br/> 
            Shortcode: <input type="text" name="shortcode" value={shortcode} onChange={this.onChange}/> <br/>
            <button type="submit">Submit</button>
          </form>
        </div>
    );
  }
}

export default AddCategory;  
