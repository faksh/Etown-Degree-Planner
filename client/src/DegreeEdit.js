import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class DegreeEdit extends Component {

  emptyDegree = {
    dID: '',
    name: '',
    type: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyDegree
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const degree = await (await fetch(`/api/degree/${this.props.match.params.id}`)).json();
      this.setState({item: degree});
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

    await fetch('/api/degree', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/degrees');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Degree' : 'Add Degree'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="dID">dID</Label>
            <Input type="text" name="dID" id="dID" value={item.dID || ''}
                   onChange={this.handleChange} autoComplete="dID"/>
          </FormGroup>
          <FormGroup>
            <Label for="name">name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="type">type</Label>
            <Input type="text" name="type" id="type" value={item.type || ''}
                   onChange={this.handleChange} autoComplete="type"/>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(DegreeEdit);
