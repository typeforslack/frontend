import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { login } from '../../helpers/api'
import { navigate } from '@reach/router'
//import 'bootstrap/dist/css/bootstrap.css'

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
        username: name,
        password: pwd,
      }

      login(obj)
        .then((res) => {
          console.log(res)
          this.storeToken(res)
          navigate('/')
        })
        .catch((error) => {
          const errorstatus = error.response
          alert('not signed up')
          return errorstatus
        })
    }
  }

  navigateToSignup() {
    return navigate('/signup')
  }

  storeToken = (res) => {
    const tokenStore = localStorage.setItem('token', res.data.token)

    return tokenStore
  }

  render() {
    return (
      <div className="login">
        <Form onSubmit={this.submitForm}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
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
          <Form.Group>
            <Form.Label>Password</Form.Label>
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
