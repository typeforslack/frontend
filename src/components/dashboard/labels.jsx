import React from 'react'
import styles from './labels.module.css'

export default function Labels() {
  const labelData = [
    {
      title: 'WPM',
      color: '#FFAB00',
    },
    {
      title: 'Accuracy',
      color: '#EC486F',
    },
  ]

  return (
    <div className={styles.labels}>
      {labelData.map((label, i) => (
        <div className={styles.labelContainer} key={i}>
          <div className={styles.label} style={{ background: label.color }} />
          <p className={styles.labelText}>{label.title}</p>
        </div>
      ))}
    </div>
  )
}
