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
          strict={true}
          countdown={60}
          paragraph="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        />
      </Router>
    )
  }
}
