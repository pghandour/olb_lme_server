import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './App.css'; // Load CSS styling

// Load components
import Lob from './components/Lob';
import Category from './components/Category';
import SelectTemplate from './components/SelectTemplate';
import EditTemplate from './components/EditTemplate';
import AddTemplate from './components/AddTemplate';
import AddCategory from './components/AddCategory';
import AddLob from './components/AddLob';

const App = () => (
  <div className='App'>
    <div className='page-title'>
      <Link to="/">
        <button type='button'>OLB LME Template Generator</button>
      </Link>
    </div>
    <hr />
    <Switch>
      <Route exact path='/' component={Homepage} />
      <Route path='/lob' component={Lob} />
      <Route path='/category/:lob' component={Category} />
      <Route path='/select-template/:lob/:category' component={SelectTemplate} />
      <Route path='/edit-template/:lob/:category/:name' component={EditTemplate} />
      <Route path='/add-new-template' component={AddTemplate} />
      <Route path='/add-new-category' component={AddCategory} />
      <Route path='/add-new-lob' component={AddLob} />
    </Switch>
  </div>
);

export default App;

const Homepage = ({ match }) => (
  <div>
    <div className='component-title'>Select An Option:</div>
    <div className='linkBtn-container'>
      <Link to={`${match.url}add-new-template`}>
        <button type='button' className='linkBtn'>Add New Template</button>
      </Link>
      <Link to={`${match.url}lob`}>
        <button type='button' className='linkBtn'>Edit Template</button>
      </Link>
      <Link to={`${match.url}add-new-category`}>
        <button type='button' className='linkBtn'>Add Category</button>
      </Link>
      <Link to={`${match.url}add-new-lob`}>
        <button type='button' className='linkBtn'>Add Lob</button>
      </Link>
    </div>
  </div>
);
