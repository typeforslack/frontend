import React from 'react'
import { Router } from '@reach/router'
import Login from '../loginSignup/login'
import Signup from '../loginSignup/signup'
import HomePage from '../homepage/index'

export default class RouterPage extends React.Component {
  render() {
    return (
      <Router>
        <HomePage path="/" />
        <Signup path="/signup" />
        <Login path="/login" />
      </Router>
    )
  }
}
