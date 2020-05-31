import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { navigate } from '@reach/router'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {
        username: '',
        password: '',
      },
    }
  }

  handleInput = (stateName) => (e) => {
    e.preventDefault()
    this.setState({
      [stateName]: e.target.value.trim(),
    })
  }

  submitForm = (event) => {
    event.preventDefault()

    const name = this.state.username
    const pwd = this.state.password
    const email = this.state.email

    if (!pwd && !name && !email) {
      this.setState({
        errors: {
          username: 'Username not entered',
          password: 'Password not entered',
          email: 'Email not entered',
        },
      })
    } else if (!pwd) {
      this.setState({
        errors: {
          password: 'Password not entered',
        },
      })
    } else if (!name) {
      this.setState({
        errors: {
          username: 'Username not entered',
        },
      })
    } else if (!email) {
      this.setState({
        errors: {
          email: 'Email not entered',
        },
      })
    } else {
      var obj = {
        name,
        pwd,
      }

      return navigate('/home')
    }
  }

  render() {
    return (
      <div className="modal">
        <Form onSubmit={this.submitForm}>
          <Form.Group controlId="formGroupname">
            <Form.Label>Username</Form.Label>
            <br></br>
            <br></br>
            <Form.Control
              id="txtbox"
              type="text"
              placeholder="Enter username"
              onChange={this.handleInput('username')}
            />
            {
              <h6 style={{ color: 'red', fontSize: '16px' }}>
                {this.state.errors.username}
              </h6>
            }
          </Form.Group>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <br></br>
            <br></br>
            <Form.Control
              id="txtbox"
              type="text"
              placeholder="Enter email"
              onChange={this.handleInput('email')}
            />
            {
              <h6 style={{ color: 'red', fontSize: '16px' }}>
                {this.state.errors.email}
              </h6>
            }
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <br></br>
            <br></br>
            <Form.Control
              id="txtbox"
              type="password"
              placeholder="Password"
              onChange={this.handleInput('password')}
            />
            {
              <h6 style={{ color: 'red', fontSize: '16px' }}>
                {this.state.errors.password}
              </h6>
            }
          </Form.Group>
          <Button id="submtBtn" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}
