import React from 'react'
import styles from './button.module.css'

export default function Button({ text, active, toggleData }) {
  return (
    <button
      className={
        active ? `${styles.buttonActive} ${styles.button}` : styles.button
      }
      onClick={toggleData}>
      {text}
    </button>
  )
}
