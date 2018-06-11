import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink} from 'react-router-dom';

import './App.css';
import Aux from './Hoc/Aux';
import Routes from './Routes/Routes';
import Navbar from './Layout/Navbar/Navbar';
import Footer from './Layout/Footer/Footer';
import Landing from './Layout/Landing/Landing';

class App extends Component {
  render() {
    return (
      <Router>
       <Aux>
         <div className="ui container">
           <Navbar />
              {Routes}
           <Landing />
           <Footer />
         </div>
      </Aux>
   </Router>
    );
  }
}

export default App;