import React, { Component } from 'react'
import LineChart from '../common/lineChart'
// import Card from "./card";
import Card from './card'
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap'
// import { LineChart } from './lineChart'

export default class Dashboard extends Component {
  state = {}

  render() {

    return (
      <div>
        <Nav fill variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/home">TypeForSlack</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Practice</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Arcade</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-3">Challange</Nav.Link>
          </Nav.Item>
        </Nav>
        <br />

        <Container>
          <Row>
            <Col>
              <Card />
            </Col>
            <Col>
              <Card />
            </Col>
            <Col>
              <Card />
            </Col>
            <Col>
              <Card />
            </Col>
          </Row>
        </Container>
        <LineChart width={460} height={400} />
      </div>
    )
  }
}
