import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { navigate, redirectTo } from '@reach/router'
import { getAuthToken, setAuthToken } from '../../helpers/storage'

export default class HomePage extends React.Component {
  logout = (event) => {
    event.preventDefault()
    setAuthToken(null)
    navigate('/login')
  }

  componentDidMount() {
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

            <Nav.Link href="/practise">Practise</Nav.Link>
            <Nav.Link href="/challenge">Challenge</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
