import React from 'react'
import { navigate } from '@reach/router'
import { signup } from '../../helpers/api'
import { setAuthToken } from '../../helpers/storage'
import './loginsignup.css'
import Logo from '../../images/Keyboard.png'
import Para from './bgpara'

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
        email: '',
      },
    }
  }

  handleInput = (stateName) => (e) => {
    e.preventDefault()
    this.setState({
      [stateName]: e.target.value.trim(),
    })
    this.handleError(stateName)
  }

  handleError = (stateName) => {
    const error = this.state.errors
    this.setState({
      errors: {
        ...error,
        [stateName]: '',
      },
    })
  }

  submitForm = async (event) => {
    event.preventDefault()

    const { username: name, password: pwd, email } = this.state

    if (!pwd && !name) {
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
      var postData = {
        username: name,
        email: email,
        password: pwd,
      }

      try {
        const response = await signup(postData)
        setAuthToken(response.data.token)
        navigate('/')
      } catch (error) {
        console.log(error.response)
        const errorstatus = error.response
        const errorKeys = Object.keys(errorstatus.data.error)
        const errorvalues = Object.values(errorstatus.data.error)
        if (errorKeys.length === 1) {
          if (errorKeys[0] === 'username') {
            this.setState({
              errors: {
                username: errorvalues[0],
              },
            })
          } else {
            console.log('check2')
            this.setState({
              errors: {
                email: errorvalues[0],
              },
            })
          }
        } else if (errorKeys.length === 2) {
          console.log('check3')
          this.setState({
            errors: {
              username: errorvalues[0],
              email: errorvalues[1],
            },
          })
        }
        return errorstatus
      }
    }
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
            <div className="signin">Sign Up </div>
            <div className="form">
              <form onSubmit={this.submitForm}>
                <div className="detailsdiv">
                  <label className="label">Username</label>
                  <br></br>

                  <input
                    className={
                      this.state.errors.username
                        ? ' txtbox txtboxRed'
                        : 'txtbox'
                    }
                    type="text"
                    placeholder="Enter username"
                    onChange={this.handleInput('username')}
                  />
                  {
                    <h6
                      style={{ color: 'red', fontSize: '16px', margin: '5px' }}>
                      {this.state.errors.username}
                    </h6>
                  }
                </div>
                <div className="detailsdiv" style={{ marginTop: '7%' }}>
                  <label className="label">Email</label>
                  <br></br>

                  <input
                    className={
                      this.state.errors.email ? ' txtbox txtboxRed' : 'txtbox'
                    }
                    type="text"
                    placeholder="Enter email"
                    onChange={this.handleInput('email')}
                  />
                  {
                    <h6
                      style={{ color: 'red', fontSize: '16px', margin: '5px' }}>
                      {this.state.errors.email}
                    </h6>
                  }
                </div>

                <div className="detailsdiv" style={{ marginTop: '7%' }}>
                  <label className="label">Password</label>

                  <br></br>

                  <input
                    className={
                      this.state.errors.password
                        ? ' txtbox txtboxRed'
                        : 'txtbox'
                    }
                    type="password"
                    placeholder="Password"
                    onChange={this.handleInput('password')}
                  />
                  {
                    <h6
                      style={{ color: 'red', fontSize: '16px', margin: '5px' }}>
                      {this.state.errors.password}
                    </h6>
                  }
                </div>
              </form>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button className="loginBtn" type="submit">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
