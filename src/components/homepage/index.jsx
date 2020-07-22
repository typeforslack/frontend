import React from 'react'
import { navigate } from '@reach/router'
import { getAuthToken } from '../../helpers/storage'
import './index.css'
import NavBar from '../common/header'

export default class HomePage extends React.Component {
  componentDidMount() {
    // Authentication hack
    if (!getAuthToken()) {
      setTimeout(async () => {
        await navigate('/login', { replace: false })
      }, 0)
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
