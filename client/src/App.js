import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import UploadTemplate from './components/UploadTemplate';
import Lob from './components/Lob';
import Category from './components/Category';
import SelectTemplate from './components/SelectTemplate';
import EditTemplate from './components/EditTemplate';

const App = () => (
  <Router className="App">
    <div>
      <Link className="" to="/"><button>Home</button></Link>
      <Link className="" to="/lob"><button>LoB</button></Link>
      <Link className="" to="/category"><button>Category</button></Link>
      <Link className="" to="/select-template"><button>SelectTemplate</button></Link>
      <Link className="" to="/edit-template"><button>Edit Template</button></Link>

      <Route exact path="/" component={Home} />
      <Route path="/lob" component={Lob} />
      <Route path="/category" component={Category} />
      <Route path="/select-template" component={SelectTemplate} />
      <Route path="/edit-template" component={EditTemplate} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <UploadTemplate />
  </div>
);



export default App;
