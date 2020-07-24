import React from 'react'
import styles from './ui.module.css'
import GoogleLogo from '../../../images/g.png'
export default function GoogleButton({ onClick, textLabel }) {
  return (
    <div className={styles.customBtn} onClick={onClick}>
      <span className={styles.icon}>
        <img className={styles.googleLogo} src={GoogleLogo} alt="glogo"></img>
      </span>
      <span className={styles.buttonText}>{textLabel}</span>
    </div>
  )
}
