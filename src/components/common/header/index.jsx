import React from 'react'
import { Link } from '@reach/router'
import styles from './header.module.css'

export default function Header() {
  return (
    <header>
      <p className={styles.navlogo}>TypeForSlack</p>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Practice</Link>
          </li>
          <li>
            <Link to="/dashboard">Arcade</Link>
          </li>
          <li>
            <Link to="/dashboard">Race</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
