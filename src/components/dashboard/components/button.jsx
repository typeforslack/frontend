import React from 'react'
import styles from './button.module.css'

export default function Button({ text, state, toggleData }) {
  return (
    <button
      className={
        state ? `${styles.buttonActive} ${styles.button}` : styles.button
      }
      onClick={toggleData}>
      {text}
    </button>
  )
}
