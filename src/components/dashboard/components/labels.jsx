import React from 'react'
import styles from './labels.module.css'

export default class Labels extends React.Component {
  state = {
    selectedOption: 'Wpm',
  }

  toggleRadioCheck = (e) => {
    var option = e.target.value
    this.setState({
      selectedOption: option,
    })
  }
  render() {
    return (
      <div
        className={styles.labels}
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <div className={styles.labelContainer}>
          <label>
            Wpm
            <input
              type="radio"
              value="Wpm"
              checked={this.state.selectedOption === 'Wpm'}
              onChange={this.toggleRadioCheck}></input>
          </label>
          <label>
            Accuracy
            <input
              type="radio"
              value="Accuracy"
              checked={this.state.selectedOption === 'Accuracy'}
              onChange={this.toggleRadioCheck}></input>
          </label>
        </div>
      </div>
    )
  }
}
