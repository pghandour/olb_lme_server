import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css'; // Load CSS styling

// Load components
import Lob from './components/Lob';
import Category from './components/Category';
import SelectTemplate from './components/SelectTemplate';
import EditTemplate from './components/EditTemplate';

const App = () => (
  <Router className='App'>
    <div>
      <div className='page-title'>OLB LME Template Generator</div>
      <div style={{ 'backgroundColor': 'lightblue', 'padding': '30px', 'textAlign': 'center' }}>
        <Link className='' to='/'><button>Home</button></Link>
        <Link className='' to='/category'><button>Category</button></Link>
        <Link className='' to='/select-template'><button>SelectTemplate</button></Link>
        <Link className='' to='/edit-template'><button>Edit Template</button></Link>
      </div>
      <hr />
      <Route exact path='/' component={Homepage} />
      <Route path='/lob/:action' component={Lob} />
      <Route path='/category/:action' component={Category} />
      <Route path='/select-template/:action' component={SelectTemplate} />
      <Route path='/edit-template' component={EditTemplate} />
    </div>
  </Router>
);

export default App;

const Homepage = ({ match }) => (
  <div>
    <div className='page-title'>Welcome Home</div>

    <ul className='router-list'>
      <li>
        <a href='http://localhost:4000/'>Add New Template</a>
      </li>
      <li>
        <Link to={`${match.url}lob/select`}>Select Existing Template</Link>
      </li>
    </ul>
  </div>
);