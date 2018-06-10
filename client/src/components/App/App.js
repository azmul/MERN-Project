import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink} from 'react-router-dom';

import './App.css';
import Aux from './Hoc/Aux';
import Routes from './Routes/Routes';

class App extends Component {
  render() {
    return (
      <Router>
       <Aux>
         <div className="ui container">
           {Routes}
         </div>
      </Aux>
   </Router>
    );
  }
}

export default App;