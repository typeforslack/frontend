import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import { login } from '../../helpers/api'
import { navigate } from '@reach/router'
import { setAuthToken } from '../../helpers/storage'
import Loader from '../common/loader'
import './loginsignup.css'
import Logo from '../../images/Keyboard.png'
import BackgroundPage from '../../images/background.png'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    errors: {
      username: '',
      password: '',
    },
    loader: false,
  }

  handleInput = (stateName) => (e) => {
    e.preventDefault()
    this.setState({
      [stateName]: e.target.value.trim(),
    })
  }

  submitForm = async (event) => {
    event.preventDefault()
    this.setState({
      loader: true,
    })
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
      var postData = {
        username: name,
        password: pwd,
      }

      try {
        const response = await login(postData)
        const token = response.data.token
        setAuthToken(token)
        this.setState({
          loader: false,
        })
        navigate('/', { replace: true })
      } catch (e) {
        const { non_field_errors } = e.response.data
        this.setState({
          errors: {
            password: non_field_errors[0],
            loader: false,
          },
        })
      }
    }
  }

  navigateToSignup() {
    return navigate('/signup')
  }

  render() {
    const { loader } = this.state
    return (
      <div>
        {loader ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div className="login">
            <div className="logoDetail">
              <img
                src={BackgroundPage}
                alt="background"
                className="backgroundImg"
              />

              <img src={Logo} alt="Logo image" className="logoImg" />
            </div>

            <div className="formDetails">
              <div className="formBox">
                <div className="signin">Sign In </div>
                <Form className="form" onSubmit={this.submitForm}>
                  <Form.Group>
                    <Form.Label className="label">Username</Form.Label>
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
                  <Form.Group style={{ marginTop: '10%' }}>
                    <Form.Label className="label">Password</Form.Label>

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
                  <span className="forgotpwd">Forgot Password ?</span>
                  <button id="loginBtn" type="submit">
                    Login
                  </button>
                </Form>
                <div className="signupdiv">
                  <span id="signupBtn">
                    New Here? &nbsp;
                    <span
                      onClick={this.navigateToSignup}
                      style={{ cursor: 'pointer', color: '#f0a500' }}>
                      Signup
                    </span>{' '}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
