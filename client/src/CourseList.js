import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class CourseList extends Component {

  constructor(props) {
    super(props);
    this.state = {courses: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/course/retrieveCourseInfos')
      .then(response => response.json())
      .then(data => this.setState({courses: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/course/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatecourses = [...this.state.courses].filter(i => i.id !== id);
      this.setState({courses: updatecourses});
    });
  }

  render() {
    const {courses, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    var courseDisplay;
    const showCourses = () => {
    // Add code to pull course info from table
    for(let course in courses.courseInfos) {
        courseDisplay += courses.courseInfos[course];
    }
  }
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/courses/new">Add Course</Button>
          </div>
          <h3>Course List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">code</th>
                <th width="20%">title</th>
                <th width="10%">credits</th>
                <th width="20%">core</th>
                <th width="40%">descrip</th>
                <th width="20%">sle</th>
                <th width="20%">prereq</th>
                <th width="20%">coreq</th>
                <th width="20%">hours</th>
                <th width="20%">graded</th>
                <th width="20%">register</th>
                <th width="20%">repeatable</th>
              </tr>
              <tr>


              <th width="20%">{courses.courseInfos[1].code}</th>
              <th width="20%">{courses.courseInfos[1].title}</th>
              <th width="10%">{courses.courseInfos[1].credits}</th>
              <th width="20%">{courses.courseInfos[1].core}</th>
              <th width="40%">{courses.courseInfos[1].descrip}</th>
              <th width="20%">{courses.courseInfos[1].sle}</th>
              <th width="20%">{courses.courseInfos[1].prereq}</th>
              <th width="20%">{courses.courseInfos[1].coreq}</th>
              <th width="20%">{courses.courseInfos[1].hours}</th>
              <th width="20%">{courses.courseInfos[1].graded}</th>
              <th width="20%">{courses.courseInfos[1].register}</th>
              <th width="20%">{courses.courseInfos[1].repeatable}</th>
              </tr>
            </thead>
            <tbody>
            {CourseList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default CourseList;
