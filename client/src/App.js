import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css'; // Load CSS styling

// Load components
import Lob from './components/Lob';
import Category from './components/Category';
import SelectTemplate from './components/SelectTemplate';
import EditTemplate from './components/EditTemplate';
import UploadTemplate from './components/UploadTemplate';

const App = () => (
  <Router className='App'>
    <div>
      <div className='page-title'>OLB LME Template Generator</div>
      <div style={{ 'backgroundColor': 'lightblue', 'padding': '30px', 'textAlign': 'center' }}>
        <Link className='' to='/'><button>Home</button></Link>
        <Link className='' to='/lob'><button>LoB</button></Link>
        <Link className='' to='/category'><button>Category</button></Link>
        <Link className='' to='/select-template'><button>SelectTemplate</button></Link>
        <Link className='' to='/edit-template'><button>Edit Template</button></Link>
      </div>
      <hr />

      <Route exact path='/' component={Homepage} />
      <Route path='/lob' component={Lob} />
      <Route path='/category' component={Category} />
      <Route path='/select-template' component={SelectTemplate} />
      <Route path='/edit-template' component={EditTemplate} />
    </div>
  </Router>
);

export default App;

const Homepage = ({ match }) => (
  <div>
    <div className='page-title'>Welcome Home</div>
    <Router>
      <div>
        <ul className='router-list'>
          <li>
            <Link to={`${match.url}add-new-template`}>Add New Template</Link>
          </li>
          <li>
            <Link to={`${match.url}select-template`}>Select Existing Template</Link>
          </li>
        </ul>
        <hr />
        <Route path='/add-new-template' component={UploadTemplate} />
        <Route path='/select-template' component={Lob} />
      </div>
    </Router>
  </div>
);