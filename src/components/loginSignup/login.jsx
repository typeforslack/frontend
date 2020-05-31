import React from 'react'
import { Form, Button } from 'react-bootstrap'
//import { samplecheck } from '../common/apiurls'
import { navigate } from '@reach/router'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      usernameErrMsg: null,
      pwderrorMsg: null,
    }

    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.navigateToSignup = this.navigateToSignup.bind(this)
  }

  handleUsername(event) {
    event.preventDefault()
    this.setState({
      username: event.target.value,
    })
  }

  handlePassword(event) {
    event.preventDefault()
    this.setState({
      password: event.target.value,
    })
  }

  submitForm(event) {
    event.preventDefault()

    console.log('check')
    var name = this.state.username
    var pwd = this.state.password
    console.log(name)
    console.log(pwd)
    if (pwd == null && name == null) {
      this.setState({
        usernameErrMsg: 'username not entered',
        pwderrorMsg: 'password not entered',
      })
    } else if (pwd == null) {
      this.setState({
        pwderrorMsg: 'password not entered',
      })
    } else if (name == null) {
      this.setState({
        usernameErrMsg: 'username not entered',
      })
    } else {
      //write a post request here
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
              onChange={this.handleUsername}
            />
            {
              <h6 style={{ color: 'red', fontSize: '16px' }}>
                {this.state.usernameErrMsg}
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
              onChange={this.handlePassword}
            />
            {
              <h6 style={{ color: 'red', fontSize: '16px' }}>
                {this.state.pwderrorMsg}
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
