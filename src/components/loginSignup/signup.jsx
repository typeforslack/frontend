import React from 'react'
import { navigate } from '@reach/router'
import { signup, googleLoginSignup } from '../../helpers/api'
import { setAuthToken } from '../../helpers/storage'
import './loginsignup.css'
import Logo from '../../images/Keyboard.png'
import Para from './bgpara'
import { gapi } from 'gapi-script'
import ButtonWithLoader from '../common/ui/button-with-loader'
import GoogleButton from '../common/ui/googeButton'

export default class Login extends React.Component {
  state = {
    isLoading: false,
    username: '',
    email: '',
    password: '',
    errors: {
      username: '',
      password: '',
      email: '',
    },
    manualSignup: true,
    errorResponse: '',
    showGoogleButton: true,
  }
  user_id = null

  // componentDidMount() {
  //   this.onSignIn()
  // }

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
      this.setState({
        isLoading: true,
      })

      try {
        const response = await signup(postData)
        setAuthToken(response.data.token)
        this.setState({
          isLoading: false,
        })
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

  onSignIn = () => {
    // Useful data for your client-side scripts:
    gapi.load('auth2', () => {
      var auth2 = gapi.auth2.init({
        client_id: process.env.REACT_CLIENT_ID,
      })

      // Sign the user in, and then retrieve their ID.
      auth2.signIn().then((googleUser) => {
        this.displayGoogelUser(googleUser)
      })
    })
  }

  displayGoogelUser = async (googleUser) => {
    if (googleUser) {
      var profile = googleUser.getBasicProfile()

      var id_token = googleUser.getAuthResponse().id_token
      if (id_token) {
        this.setState({
          manualSignup: false,
          email: profile.getEmail(),
          errors: {
            username: 'Please fill unique username',
          },
          showGoogleButton: false,
        })
        this.user_id = id_token
      }
    }
  }

  submitUsername = async (event) => {
    event.preventDefault()
    const { username: name } = this.state
    if (!name) {
      this.setState({
        errors: {
          username: 'Please fill the empty field',
        },
      })
    } else {
      let obj = {
        username: name,
        token: this.user_id,
      }
      this.setState({
        isLoading: true,
      })
      try {
        const response = await googleLoginSignup(obj)
        setAuthToken(response.data.token)
        this.setState({
          isLoading: false,
        })
        navigate('/')
      } catch (e) {
        const errorMsg = e.response.data.error
        this.setState({
          errorResponse: errorMsg,
          isLoading: false,
          showGoogleButton: true,
        })
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
              <form>
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
                    value={this.state.email}
                  />
                  {
                    <h6
                      style={{ color: 'red', fontSize: '16px', margin: '5px' }}>
                      {this.state.errors.email}
                    </h6>
                  }
                </div>
                {this.state.manualSignup && (
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
                        style={{
                          color: 'red',
                          fontSize: '16px',
                          margin: '5px',
                        }}>
                        {this.state.errors.password}
                      </h6>
                    }
                  </div>
                )}
              </form>
              <div>
                <h6 style={{ color: 'red', fontSize: '16px', margin: '5px' }}>
                  {this.state.errorResponse}
                </h6>
                <ButtonWithLoader
                  isLoading={this.state.isLoading}
                  // className="loginBtn"
                  // type="submit"
                  onClick={
                    Boolean(this.state.manualSignup)
                      ? this.submitForm
                      : this.submitUsername
                  }>
                  Sign Up
                </ButtonWithLoader>
                {this.state.showGoogleButton && (
                  <>
                    <div style={{ margin: '10px auto' }}>Or </div>
                    <GoogleButton
                      onClick={this.onSignIn}
                      textLabel="Sign Up With Google"></GoogleButton>
                    {/* <div id="customBtn" className="customGPlusSignIn" onClick={this.onSignIn}>
                      <span className="icon"><img className="googleLogo" src={GoogleLogo} alt="glogo"></img></span>
                      <span className="buttonText">Sign Up With Google</span>
                    </div> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
