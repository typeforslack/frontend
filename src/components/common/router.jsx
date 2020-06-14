import React from 'react'
import { Router } from '@reach/router'
import Login from '../loginSignup/login'
import Signup from '../loginSignup/signup'
import HomePage from '../homepage'
import SettingPage from '../settingspage/settings'
import Practise from '../typingpage/practise'
import Challenge from '../typingpage/challenge'
import Arcade from '../typingpage/arcade'
import Dashboard from '../dashboard/index'

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
        <Arcade path="/arcade" />
        <Dashboard path="/dashboard" />
      </Router>
    )
  }
}
