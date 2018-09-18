import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css'; // Load CSS styling

// Load components
import Lob from './components/Lob';
import Category from './components/Category';
import SelectTemplate from './components/SelectTemplate';
import EditTemplate from './components/EditTemplate';

const App = () => (
  <div className='App'>
    <div className='page-title'>OLB LME Template Generator</div>
    <Route exact path='/' component={Homepage} />
    <Route path='/lob' component={Lob} />
    <Route path='/category/:lob' component={Category} />
    <Route path='/select-template/:lob/:category' component={SelectTemplate} />
    <Route path='/edit-template/:name' component={EditTemplate} />
  </div>
);

export default App;

const Homepage = ({ match }) => (
  <div>
    <ul className='router-list'>
      <li>
        <a href='http://localhost:4000/'>Add New Template</a>
      </li>
      <li>
        <Link to={`${match.url}lob`}>Select Existing Template</Link>
      </li>
    </ul>
  </div>
);