import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import './Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
              {<NavLink className="navbar-brand"  exact strict to="/">DevConnector</NavLink>}
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                <span className="navbar-toggler-icon"></span>
              </button>
        
              <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="profiles.html"> Developers
                    </a>
                  </li>
                </ul>
        
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    {<NavLink className="nav-link" exact strict to="/register">Sign Up</NavLink>}
                  </li>
                  <li className="nav-item">
                    {<NavLink className="nav-link" exact strict to="/login">Login</NavLink>}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        );
    }
}

export default Navbar;

