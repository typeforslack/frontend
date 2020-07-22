import React from 'react'
import { Link } from '@reach/router'
import styles from './header.module.css'
import DownArrow from '../../../images/chevron-down.svg'
import LogOut from '../../loginSignup/logout'
import DashBoard from '../../dashboard'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
    }
    this.home = React.createRef()
  }

  openModal = (e) => {
    e.preventDefault()
    let downArrowToggle = this.state.modalOpen
    this.setState({
      modalOpen: !downArrowToggle,
    })
  }

  toggleLogout = () => {
    LogOut()
  }

  render() {
    return (
      <div>
        <header>
          <p className={styles.logo}>
            <Link to="/">TypeForSlack</Link>
          </p>
          <nav>
            <ul>
              <li>
                <Link to="/practise">Practice</Link>
              </li>
              <li>
                <Link to="/arcade">Arcade</Link>
              </li>
              <li>
                <Link to="/race">Race</Link>
              </li>
              {/* <li>
                <Link to="/dashboard">DashBoard</Link>
              </li> */}
              <li>
                <div className={styles.profileDetails} onClick={this.openModal}>
                  <span>Profile</span>
                  <img
                    src={DownArrow}
                    alt="downarrow"
                    style={{ position: 'absolute' }}
                  />
                  {this.state.modalOpen && (
                    <div className={styles.profileModal}>
                      <ul>
                        <li>
                          <Link to="/setting">Settings</Link>
                        </li>
                        <li onClick={this.toggleLogout}>Logout</li>
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </nav>
        </header>
        <DashBoard />
      </div>
    )
  }
}
