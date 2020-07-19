import React from 'react'
import { navigate } from '@reach/router'
import { getAuthToken } from '../../helpers/storage'
// import { gapi } from 'gapi-script'
import './index.css'
import NavBar from '../common/header'
import Logout from '../loginSignup/logout'

export default class HomePage extends React.Component {
  logout = (event) => {
    event.preventDefault()
    Logout()
  }

  componentDidMount() {
    // Authentication hack
    if (!getAuthToken()) {
      setTimeout(async () => {
        await navigate('/login', { replace: false })
      }, 10)
    }
  }

  render() {
    return (
      <div className="home">
        <NavBar />
      </div>
    )
  }
}
