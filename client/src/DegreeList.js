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

    fetch('api/degrees')
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

    console.log(degrees);

    const DegreeList = degrees.map(degree => {
      return <tr key={degree.id}>
        <td style={{whiteSpace: 'nowrap'}}>{degree.dID}</td>
        <td>{degree.name}</td>
        <td>{degree.type}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/degrees/" + degree.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(degree.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

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
