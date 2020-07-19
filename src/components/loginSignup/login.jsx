import React, { Component } from 'react'
import { login } from '../../helpers/api'
import { navigate } from '@reach/router'
import { setAuthToken } from '../../helpers/storage'
import Para from './bgpara'
import Logo from '../../images/Keyboard.png'
import ButtonWithLoader from '../common/ui/button-with-loader'
import './loginsignup.css'
import { gapi } from 'gapi-script'
// import authenticate from './gapi'

export default class Login extends Component {
  state = {
    isLoading: false,
    username: '',
    password: '',
    errors: {
      username: '',
      password: '',
    },
    userId: '',
  }

  handleInput = (stateName) => (e) => {
    e.preventDefault()
    this.setState({
      [stateName]: e.target.value.trim(),
      errors: {
        username: '',
        password: '',
      },
    })
    this.handleError(stateName)
    console.log(e.target.value)
  }

  handleError = (stateName) => {
    const error = this.state.errors
    this.setState({
      errors: {
        ...error,
        credentials: '',
        [stateName]: '',
      },
    })
  }

  submitForm = async (event) => {
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
      var postData = {
        username: name,
        password: pwd,
      }

      this.setState({
        isLoading: true,
      })

      try {
        const response = await login(postData)
        const token = response.data.token
        setAuthToken(token)
        this.setState({
          isLoading: false,
        })
        navigate('/', { replace: true })
      } catch (e) {
        const { non_field_errors } = e.response.data
        this.setState({
          isLoading: false,
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

  onSignIn = () => {
    // Useful data for your client-side scripts:

    gapi.load('auth2', () => {
      var auth2 = gapi.auth2.init({
        client_id:
          '580794985194-gjre1am52q072bhig904440e5fsd7r5b.apps.googleusercontent.com',
      })

      // Sign the user in, and then retrieve their ID.
      auth2.signIn().then((googleUser) => {
        console.log('chcek')
        console.log(googleUser)
        this.displayGoogelUser(googleUser)
      })
    })
  }

  displayGoogelUser = async (googleUser) => {
    if (googleUser) {
      var profile = googleUser.getBasicProfile()
      console.log('ID: ' + profile.getId()) // Don't send this directly to your server!
      console.log('Full Name: ' + profile.getName())
      console.log('Given Name: ' + profile.getGivenName())
      console.log('Family Name: ' + profile.getFamilyName())
      console.log('Image URL: ' + profile.getImageUrl())
      console.log('Email: ' + profile.getEmail())
      var id_token = googleUser.getAuthResponse().id_token
      console.log(id_token)
      // try {
      //   const response = await id_token(id_token)
      //   const token = response.data.token
      //   setAuthToken(token)
      //   this.setState({
      //     isLoading: false,
      //   })
      //   navigate('/', { replace: true })
      // } catch (e) {
      //   const { non_field_errors } = e.response.data
      //   this.setState({
      //     isLoading: false,
      //     errors: {
      //       credentials: non_field_errors[0],
      //     },
      //   })
      // }
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
            <div className="signin">Sign In </div>
            <div className="form">
              <form>
                <div className="detailsdiv">
                  <label className="label">Username</label>
                  <br></br>
                  <input
                    className={
                      this.state.errors.username ? 'txtbox txtboxRed' : 'txtbox'
                    }
                    type="text"
                    placeholder="Enter username"
                    onChange={this.handleInput('username')}
                  />
                  <h6 style={{ color: 'red', fontSize: '16px', margin: '5px' }}>
                    {this.state.errors.username}
                  </h6>
                </div>
                <div className="detailsdiv" style={{ marginTop: '8%' }}>
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
                  <h6 style={{ color: 'red', fontSize: '16px', margin: '5px' }}>
                    {this.state.errors.password}
                  </h6>
                </div>
              </form>
              <h6 style={{ color: 'red', fontSize: '16px' }}>
                {this.state.errors.credentials}
              </h6>
              <br />
              <ButtonWithLoader
                isLoading={this.state.isLoading}
                onClick={this.submitForm}>
                Login
              </ButtonWithLoader>
              <div
                className="g-signin2"
                onClick={this.onSignIn}
                data-theme="dark"></div>
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
