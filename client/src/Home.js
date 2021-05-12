import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component {

//Pull Courses
  constructor(props) {
    super(props);
    this.state = {courses: [],  degrees: [], core: [], value: '', isLoading: true};
    //this.state = {value: ''};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

// Fetch data from database
    fetch('api/course/retrieveCourseInfos')
      .then(response => response.json())
      .then(data => this.setState({courses: data, isLoading: false}));
      
      fetch('api/degree/retrieveDegreeInfos')
       .then(response => response.json())
       .then(data => this.setState({degrees: data, isLoading: false}));
  
       fetch('api/core/retrieveCoreInfos')
       .then(response => response.json())
       .then(data => this.setState({core: data, isLoading: false}));
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
    const {courses, degrees, core, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    var code = [];
    for (let i in courses.courseInfos) {
      code.push(courses.courseInfos[i].code);
    }
   
    var major = [];
    for (let i in degrees.degreeInfos) {
      //console.log(degrees.degreeInfos[i].type);
      if (degrees.degreeInfos[i].type === " Bachelor’s" || degrees.degreeInfos[i].type === " Master’s" || degrees.degreeInfos[i].type === " Doctoral" ||  degrees.degreeInfos[i].type === " Certificates" ||  degrees.degreeInfos[i].type === " Advising Program" | degrees.degreeInfos[i].type === " Joint Degree Programs")
        major.push(degrees.degreeInfos[i].name); 
    }

    var minor = [];
    for (let i in degrees.degreeInfos) {
      //console.log(degrees.degreeInfos[i].type);
      if (degrees.degreeInfos[i].type === " Minors")
        minor.push(degrees.degreeInfos[i].name); 
    }

    var displayCourse; 
    const handleSubmit = (course) => {
     console.log(course);
     for (let i in courses.courseInfos) {
      if(courses.courseInfos[i].code === course)
        displayCourse = course;
     }
     displayCourse = courses.courseInfos[0].code + " " + courses.courseInfos[0].title + " " + courses.courseInfos[0].credits + " " + courses.courseInfos[0].descrip;
     console.log(displayCourse);
    } 

    var num=0;
    const incrementYear = () => {
      num++;
    }

    return (
      <div>
       <AppNavbar/>
        <Container fluid>
          <Button color="link"><Link to="/degrees">Degree List</Link></Button>
        </Container>
        <Container fluid>
          <Button color="link"><Link to="/courses">Course List</Link></Button>
        </Container>
        <div><h1>Etown Degree Planner</h1></div>
        <div class="box">
          <aside class="nav div.d-flex flex-column p- white bg-dark">
            <h1>Navigation</h1>
            <p>Pull from courses table, include ability to enter in custom input</p>
            <label>Select a Course</label>
            <form name="selectCourse">
            <select name="course" id="coursedropdown">
              <option value="" selected>--select--</option>
              {code.map((name)=> {
                return <option value={name}>{name}</option>
              })}
              <h2 id="choose"></h2>
            </select>
            <button type="submit" id="selection" onSubmit={handleSubmit(document.getElementById("coursedropdown"))}>Submit</button>
            </form>
          </aside>
          <div class="planner">
            <main class="schedule scroller">
              <h2>Schedule</h2>

              <div class="degree_info">
              <section class="major">
                <p>Major: </p>
                <select name="major">
                  <option value="">--select--</option>
                  {major.map((major) => {
                    return <option>{major}</option>
                  })}
                </select>
              </section>
              <section>
                <form onSubmit="addMajor">
                <button type="submit">Major +</button>
                </form>
              </section>
              
              <section class="minor">
              <p>Minor: </p>
                <select name="minor">
                  <option value="">--select--</option>
                  {minor.map((minor) => {
                    return <option>{minor}</option>
                  })}
                </select>
              </section>
              <section>
                <form onSubmit="addMinor">
                <button type="submit">Minor +</button>
                </form>
                
              </section>
              </div>

              <section class="year scroller">
                {incrementYear()}
                <p>Year {num}</p>
                <section class="semester">
                  <p>Fall</p>
                </section>
                <section class="semester">
                  <p>Spring</p>
                </section>
              </section>
              <button>Add Year</button>
              <section class="year scroller">
                <p>Year __</p>
                <section class="semester">
                  <p>Fall</p>
                </section>
                <section class="semester">
                  <p>Spring</p>
                </section>
              </section>
              <section class="year scroller">
                <p>Year __</p>
                <section class="semester">
                  <p>Fall</p>
                </section>
                <section class="semester">
                  <p>Spring</p>
                </section>
              </section>
            </main>
            <div class="selection">
              <h2>Selection</h2>
              <em>Course selected from left autofills in this selection box</em>
              <form onSubmit={handleSubmit()}>
                <p>{displayCourse}</p>
              </form>
            </div>
            </div>
            <footer class="footer">
              <object data="https://catalog.etown.edu/content.php?catoid=24&navoid=1231" width="1000px" height="400"> 
              <embed src="https://catalog.etown.edu/content.php?catoid=24&navoid=1231" width="auto" height="400"> 
              </embed> Trouble displaying site
              </object>
            </footer>
        </div>
      </div>
    );
  }
}

export default Home;
