import React from 'react'
import { Router } from '@reach/router'
import Login from '../loginSignup/login'
import Signup from '../loginSignup/signup'
import HomePage from '../homepage'
import SettingPage from '../settingspage/settings'
import Practise from '../typingpage/practise'
import Challenge from '../typingpage/challenge'
import Arcade from '../typingpage/arcade'
import Dashboard from '../dashboard'
import TestArena from '../arena/test'

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
        <TestArena
          path="/test"
          countdown={60}
          paragraph="However, we also have professional native translators to translate Hindi to English and vice versa. The work will be error-free and quick and at a reasonable cost."
        />
      </Router>
    )
  }
}
