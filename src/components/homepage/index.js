import React from 'react'
import { Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap'
import { navigate, Link } from '@reach/router'
import { getAuthToken, removeAuthToken } from '../../helpers/storage'
import { getUserlog } from '../../helpers/api'

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
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item href="/setting">
                  Profile Settings
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3" onClick={this.logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <NavItem>
              <Link to="/practise">Practise</Link>
            </NavItem>
            <NavItem>
              <Link to="/challenge">Challenge</Link>
            </NavItem>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
