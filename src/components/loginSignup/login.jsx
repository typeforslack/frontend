import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { navigate } from '@reach/router'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    errors: {
      username: '',
      password: '',
    },
  }

  handleInput = (stateName) => (e) => {
    e.preventDefault()
    this.setState({
      [stateName]: e.target.value.trim(),
    })
  }

  submitForm = (event) => {
    event.preventDefault()

    var name = this.state.username
    var pwd = this.state.password

    if (!pwd && !name) {
      this.setState({
        errors: {
          username: 'Username not entered',
          password: 'Password not entered',
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
    } else {
      var obj = {
        name,
        pwd,
      }

      return navigate('/home')
    }
  }

  navigateToSignup() {
    return navigate('/signup')
  }

  render() {
    return (
      <div className="modal">
        <Form onSubmit={this.submitForm}>
          <Form.Group controlId="formGroupEmail">
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

        <Button id="signupBtn" type="submit" onClick={this.navigateToSignup}>
          Signup
        </Button>
      </div>
    )
  }
}
