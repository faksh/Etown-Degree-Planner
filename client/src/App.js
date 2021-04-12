import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DegreeList from './DegreeList';
import DegreeEdit from './DegreeEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/degrees' exact={true} component={DegreeList}/>
          <Route path='/degrees/:id' component={DegreeEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
/*
import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
const mysql = require('mysql');

class App extends Component {
  state = {
    response: {}
  };

  componentDidMount() {
    axios.get('/api/v1/say-something').then((res) => {
      const response = res.data;
      this.setState({response});
    });

  }

  render() {
    return (
      <div className="App">
        <h1>Hello from the frontend!</h1>
        <h1>{this.state.response.body}</h1>
      </div>
    );
  }
}

export default App;
*/
