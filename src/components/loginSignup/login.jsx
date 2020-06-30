import React, { Component } from 'react'
import { login } from '../../helpers/api'
import { navigate } from '@reach/router'
import { setAuthToken } from '../../helpers/storage'
import Para from './bgpara'
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
    console.log(e.target.value)
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
            credentials: non_field_errors[0],
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
            <Para />
          </div>
        </div>
        <img src={Logo} alt="Logoimage" className="logoImg" />
        <div className="formDetails">
          <div className="formBox">
            <div className="signin">Sign In </div>
            <div className="form">
              <form >
                <div className="detailsdiv">
                  <label className="label">Username</label>
                  <br></br>

                  <input
                    className={this.state.errors.username ? "txtboxRed" : "txtbox"}
                    type="text"
                    placeholder="Enter username"
                    onChange={this.handleInput('username')}
                  />
                  {
                    <h6 style={{ color: 'red', fontSize: '16px', margin: "5px" }}>
                      {this.state.errors.username}
                    </h6>
                  }
                </div>
                <div className="detailsdiv" style={{ marginTop: '8%' }}>
                  <label className="label">Password</label>

                  <br></br>

                  <input
                    className={this.state.errors.password ? "txtboxRed" : "txtbox"}
                    type="password"
                    placeholder="Password"
                    onChange={this.handleInput('password')}
                  />
                  {
                    <h6 style={{ color: 'red', fontSize: '16px', margin: "5px" }}>
                      {this.state.errors.password}
                    </h6>
                  }
                </div>
              </form>
              <div className="forgotpwd">Forgot Password ?</div>
              {
                <h6 style={{ color: 'red', fontSize: '16px' }}>
                  {this.state.errors.credentials}
                </h6>
              }
              <button className="loginBtn" type="submit" onClick={this.submitForm}>
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
