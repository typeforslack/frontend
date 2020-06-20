import React, { Component } from 'react'
import { login } from '../../helpers/api'
import { navigate } from '@reach/router'
import { setAuthToken } from '../../helpers/storage'

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
  }

  handleInput = (stateName) => (e) => {
    e.preventDefault()
    this.setState({
      [stateName]: e.target.value.trim(),
    })
  }

  submitForm = async (event) => {
    event.preventDefault()
    this.setState({})
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
        this.setState({})
        navigate('/', { replace: true })
      } catch (e) {
        const { non_field_errors } = e.response.data
        this.setState({
          errors: {
            password: non_field_errors[0],
          },
        })
      }
    }
  }

  navigateToSignup() {
    return navigate('/signup')
  }

  render() {
    return (
      <div className="login">
        <div className="logoDetail">
          <img
            src={BackgroundPage}
            alt="background"
            className="backgroundImg"
          />

          <img src={Logo} alt="Logoimage" className="logoImg" />
        </div>

        <div className="formDetails">
          <div className="formBox">
            <div className="signin">Sign In </div>
            <form className="form" onSubmit={this.submitForm}>
              <label className="label">Username</label>
              <br></br>

              <input
                className="txtbox"
                type="text"
                placeholder="Enter username"
                onChange={this.handleInput('username')}
              />
              {
                <h6 style={{ color: 'red', fontSize: '16px' }}>
                  {this.state.errors.username}
                </h6>
              }

              <div style={{ marginTop: '10%' }}>
                <label className="label">Password</label>

                <br></br>

                <input
                  className="txtbox"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleInput('password')}
                />
                {
                  <h6 style={{ color: 'red', fontSize: '16px' }}>
                    {this.state.errors.password}
                  </h6>
                }
              </div>
              <span className="forgotpwd">Forgot Password ?</span>
              <button className="loginBtn" type="submit">
                Login
              </button>
            </form>
            <div className="signupdiv">
              <span className="signupBtn">
                New Here? &nbsp;
                <span className="signup" onClick={this.navigateToSignup}>
                  Signup
                </span>{' '}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
