import React from 'react'
import NestedDonutChart from '../../common/charts/nestedDonutChart'
import Dropdown from './dropdown'
import styles from './paragraphsCard.module.css'

const dropdownData = ['All Time', 'Weekly', 'Monthly'],
  labelData = [
    {
      title: 'Total',
      color: '#F0A500',
    },
    {
      title: 'Practise',
      color: '#DF6C01',
    },
    {
      title: 'Arcade',
      color: '#E01E5A',
    },
  ]

export default function ParagraphsCard() {
  return (
    <div className={styles.card}>
      <div className={styles.titleSection}>
        <h4>Paragraphs</h4>
        <Dropdown data={dropdownData} size="small" />
      </div>
      <div className={styles.chartSection}>
        <NestedDonutChart />
        <div
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          {labelData.map((label, i) => (
            <div key={i} className={styles.labelContainer}>
              <div
                className={styles.label}
                style={{ background: label.color }}
              />
              <p className={styles.labelText}>{label.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
