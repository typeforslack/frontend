import React from 'react'
import styles from './ui.module.css'

const loader = (
  <div className={styles.loaderEllipse}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)
export default function ButtonWithLoader({ isLoading, children, onClick }) {
  return (
    <button className={styles.button} type="submit" onClick={onClick}>
      {!isLoading ? children : loader}
    </button>
  )
}
