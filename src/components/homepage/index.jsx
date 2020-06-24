import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { navigate, Link } from '@reach/router'
import { getAuthToken, removeAuthToken } from '../../helpers/storage'

export default class HomePage extends React.Component {
  logout = (event) => {
    event.preventDefault()
    removeAuthToken()
    navigate('/login')
  }

  componentDidMount() {
    // Authentication hack
    if (!getAuthToken()) {
      setTimeout(async () => {
        await navigate('/login', { replace: false })
      }, 10)
    }
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Type For Slack</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown
                title="Profile"
                id="basic-nav-dropdown"
                className="profileDropdown">
                <NavDropdown.Item href="/setting">
                  Profile Settings
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3" onClick={this.logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav.Item className="practise">
              <Link to="/practise">Practise</Link>
            </Nav.Item>
            <Nav.Item className="practise">
              <Link to="/arcade">Arcade</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/challenge">race</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/dashboard">Dashboard</Link>
            </Nav.Item>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
