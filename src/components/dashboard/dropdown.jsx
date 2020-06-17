import React, { Component } from 'react'
import styles from './dropdown.module.css'
import Up from '../../images/chevron-up.svg'
import Down from '../../images/chevron-down.svg'

export default class Dropdown extends Component {
  state = {
    selectedOption: 'All',
    dropdown: false,
    options: ['All', 'Practise', 'Arena'],
  }

  toggleDropdown = () => {
    this.setState({
      dropdown: !this.state.dropdown,
    })
  }

  selectOption = (option) => {
    this.setState({
      selectedOption: option,
      dropdown: false,
    })
  }

  render() {
    return (
      <>
        <div className={styles.dropdown} onClick={this.toggleDropdown}>
          <h4 className={styles.selectedText}>{this.state.selectedOption}</h4>
          <img
            className={styles.icon}
            src={this.state.dropdown ? Up : Down}
            alt="Dropdown icon"
          />
        </div>
        {this.state.dropdown ? (
          <div className={styles.dropdownList}>
            {this.state.options.map((option, i) => (
              <div
                className={styles.option}
                onClick={() => this.selectOption(option)}
                key={i}>
                <p className={styles.text}>{option}</p>
              </div>
            ))}
          </div>
        ) : null}
      </>
    )
  }
}
