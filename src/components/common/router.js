import React from 'react'
import { Router } from '@reach/router'
import Login from '../loginSignup/login'
import Signup from '../loginSignup/signup'
import HomePage from '../homepage/index'
import SettingPage from '../settingspage/settings'
import Practise from '../typingpage/practise'
import Challenge from '../typingpage/challenge'

export default class RouterPage extends React.Component {
  render() {
    return (
      <Router>
        <HomePage exact path="/" />
        <Signup path="/signup" />
        <Login path="/login" />
        <SettingPage path="/setting" />
        <Practise path="/practise" />
        <Challenge path="/challenge" />
      </Router>
    )
  }
}
