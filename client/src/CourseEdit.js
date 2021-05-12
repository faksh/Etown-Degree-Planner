import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class CourseEdit extends Component {

  emptyCourse = {
    code: '',
    title: '',
    credits: '',
    core: '',
    descrip: '',
    sle: '',
    prereq: '',
    corereq: '',
    hours: '',
    graded: '',
    register: '',
    repeatable: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyCourse
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const course = await (await fetch(`/api/course/${this.props.match.params.id}`)).json();
      this.setState({item: course});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/course', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/courses');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Course' : 'Add Course'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="code">code</Label>
            <Input type="text" name="code" id="code" value={item.code || ''}
                   onChange={this.handleChange} autoComplete="code"/>
          </FormGroup>
          <FormGroup>
            <Label for="title">title</Label>
            <Input type="text" name="title" id="title" value={item.title || ''}
                   onChange={this.handleChange} autoComplete="title"/>
          </FormGroup>
          <FormGroup>
            <Label for="credits">credits</Label>
            <Input type="text" name="credits" id="credits" value={item.credits || ''}
                   onChange={this.handleChange} autoComplete="credits"/>
          </FormGroup>
          <FormGroup>
            <Label for="core">core</Label>
            <Input type="text" name="core" id="core" value={item.core || ''}
                   onChange={this.handleChange} autoComplete="core"/>
          </FormGroup>
          <FormGroup>
            <Label for="descrip">description</Label>
            <Input type="text" name="descrip" id="descrip" value={item.descrip || ''}
                   onChange={this.handleChange} autoComplete="descrip"/>
          </FormGroup>
          <FormGroup>
            <Label for="sle">sle</Label>
            <Input type="text" name="sle" id="sle" value={item.sle || ''}
                   onChange={this.handleChange} autoComplete="sle"/>
          </FormGroup>
          <FormGroup>
            <Label for="prereq">prereq</Label>
            <Input type="text" name="prereq" id="prereq" value={item.prereq || ''}
                   onChange={this.handleChange} autoComplete="prereq"/>
          </FormGroup>
          <FormGroup>
            <Label for="corereq">corereq</Label>
            <Input type="text" name="corereq" id="corereq" value={item.corereq || ''}
                   onChange={this.handleChange} autoComplete="corereq"/>
          </FormGroup>
          <FormGroup>
            <Label for="hours">hours</Label>
            <Input type="text" name="hours" id="hours" value={item.hours || ''}
                   onChange={this.handleChange} autoComplete="hours"/>
          </FormGroup>
          <FormGroup>
            <Label for="graded">graded</Label>
            <Input type="text" name="graded" id="graded" value={item.graded || ''}
                   onChange={this.handleChange} autoComplete="graded"/>
          </FormGroup>
          <FormGroup>
            <Label for="register">register</Label>
            <Input type="text" name="register" id="register" value={item.register || ''}
                   onChange={this.handleChange} autoComplete="register"/>
          </FormGroup>
          <FormGroup>
            <Label for="repeatable">repeatable</Label>
            <Input type="text" name="repeatable" id="repeatable" value={item.repeatable || ''}
                   onChange={this.handleChange} autoComplete="repeatable"/>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(CourseEdit);
