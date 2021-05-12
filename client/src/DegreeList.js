import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class DegreeList extends Component {

  constructor(props) {
    super(props);
    this.state = {degrees: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/degree/retrieveDegreeInfos')
      .then(response => response.json())
      .then(data => this.setState({degrees: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/api/degree/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updateDegrees = [...this.state.degrees].filter(i => i.id !== id);
      this.setState({degrees: updateDegrees});
    });
  }

  render() {
    const {degrees, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/degrees/new">Add Degree</Button>
          </div>
          <h3>Degree List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">dID</th>
                <th width="20%">name</th>
                <th width="10%">type</th>
              </tr>

              <tr>
              <th width="20%">{degrees.degreeInfos[1].dID}</th>
              <th width="20%">{degrees.degreeInfos[1].name}</th>
              <th width="10%">{degrees.degreeInfos[1].type}</th>
              </tr>
            </thead>
            <tbody>
            {DegreeList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default DegreeList;
