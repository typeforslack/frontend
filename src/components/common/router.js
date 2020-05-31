import React from 'react'
import { Router } from '@reach/router'
import Login from '../loginSignup/login'
import Signup from '../loginSignup/signup'
import HomePage from '../homepage/index'

export default class RouterPge extends React.Component {
  render() {
    return (
      <Router>
        <Login path="/" />
        <Signup path="/signup" />
        <HomePage path="/home" />
      </Router>
    )
  }
}
