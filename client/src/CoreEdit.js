import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class CoreEdit extends Component {

  emptyCore = {
    coreID: '',
    name: '',
    amount: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyCore
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const core = await (await fetch(`/api/core/${this.props.match.params.id}`)).json();
      this.setState({item: core});
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

    await fetch('/api/core', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/cores');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Edit Core' : 'Add Core'}</h2>;

    return <div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="coreID">coreID</Label>
            <Input type="text" name="coreID" id="coreID" value={item.coreID || ''}
                   onChange={this.handleChange} autoComplete="coreID"/>
          </FormGroup>
          <FormGroup>
            <Label for="name">name</Label>
            <Input type="text" name="name" id="name" value={item.name || ''}
                   onChange={this.handleChange} autoComplete="name"/>
          </FormGroup>
          <FormGroup>
            <Label for="amount">amount</Label>
            <Input type="text" name="amount" id="amount" value={item.amount || ''}
                   onChange={this.handleChange} autoComplete="amount"/>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(CoreEdit);
