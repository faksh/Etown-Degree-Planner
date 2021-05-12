import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class CoreList extends Component {

  constructor(props) {
    super(props);
    this.state = {cores: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/core/retrieveCoreInfos')
      .then(response => response.json())
      .then(data => this.setState({cores: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/core/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updateCores = [...this.state.cores].filter(i => i.id !== id);
      this.setState({cores: updateCores});
    });
  }

  render() {
    const {cores, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/cores/new">Add Core</Button>
          </div>
          <h3>Core List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">coreID</th>
                <th width="20%">name</th>
                <th width="10%">amount</th>
              </tr>
            </thead>
            <tbody>
            {CoreList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default CoreList;
