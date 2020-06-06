import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { navigate } from '@reach/router'

export default class HomePage extends React.Component {
  logout = (event) => {
    event.preventDefault()
    localStorage.setItem('token', null)
    navigate('/login')
  }

  // componentDidMount() {
  //   if (localStorage.getItem("token") == null) {
  //     navigate("/login")
  //   }
  // }

  render() {
    const getlsval = localStorage.getItem('token')
    console.log(getlsval)
    if (getlsval == 'null') {
      navigate('/login')
    }

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
