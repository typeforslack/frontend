import React, { Component } from 'react'
import { login } from '../../helpers/api'
import { navigate } from '@reach/router'
import { setAuthToken } from '../../helpers/storage'

import './loginsignup.css'
import Logo from '../../images/Keyboard.png'

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
          <div className="bgText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum." "Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.""Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.""Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.""Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum."
          </div>
        </div>
        <img src={Logo} alt="Logoimage" className="logoImg" />
        <div className="formDetails">
          <div className="formBox">
            <div className="signin">Sign In </div>
            <div className="form">
              <form onSubmit={this.submitForm}>
                <div className="detailsdiv">
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
                </div>
                <div className="detailsdiv" style={{ marginTop: '8%' }}>
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
              </form>
              <div className="forgotpwd">Forgot Password ?</div>
              <button className="loginBtn" type="submit">
                Login
              </button>
            </div>
            <div className="signupdiv">
              New Here? &nbsp;
              <span className="signup" onClick={this.navigateToSignup}>
                Signup
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
