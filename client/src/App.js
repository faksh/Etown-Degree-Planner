import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DegreeList from './DegreeList';
import DegreeEdit from './DegreeEdit';
import CourseList from './CourseList';
import CourseEdit from './CourseEdit';
import CoreList from './CoreList';
import CoreEdit from './CoreEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch> 
          <Route path='/' exact={true} component={Home}/>
          <Route path='/degrees' exact={true} component={DegreeList}/>
          <Route path='/degrees/:id' component={DegreeEdit}/>
          <Route path='/courses' exact={true} component={CourseList}/>
          <Route path='/courses/:id' component={CourseEdit}/>
          <Route path='/core' exact={true} component={CoreList}/>
          <Route path='/core/:id' component={CoreEdit}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
