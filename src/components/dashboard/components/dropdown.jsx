import React, { Component } from 'react'
import styles from './dropdown.module.css'
import Up from '../../../images/chevron-up.svg'
import Down from '../../../images/chevron-down.svg'

export default class Dropdown extends Component {
  state = {
    selectedOption: '',
    dropdown: false,
    options: [],
    size: 'medium', // Default size is medium
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

  componentDidMount() {
    this.setState({
      options: this.props.data,
      selectedOption: this.props.data && this.props.data[0],
      size: this.props.size ? this.props.size : this.state.size,
    })
  }

  render() {
    let DROPDOWN = styles.dropdown,
      SELECTED_TEXT = styles.selectedText,
      ICON = styles.icon,
      DROPDOWN_LIST = styles.dropdownList,
      OPTION = styles.option,
      TEXT = styles.text

    if (this.state.size === 'small') {
      DROPDOWN = styles.dropdownSmall
      DROPDOWN_LIST = styles.dropdownListSmall
    }

    return (
      <>
        <div className={DROPDOWN} onClick={this.toggleDropdown}>
          <h4 className={SELECTED_TEXT}>{this.state.selectedOption}</h4>
          <img
            className={ICON}
            src={this.state.dropdown ? Up : Down}
            alt="Dropdown icon"
          />
          {this.state.dropdown ? (
            <div className={DROPDOWN_LIST}>
              {this.state.options &&
                this.state.options.map((option, i) => (
                  <div
                    className={OPTION}
                    onClick={() => this.selectOption(option)}
                    key={i}>
                    <p className={TEXT}>{option}</p>
                  </div>
                ))}
            </div>
          ) : null}
        </div>
      </>
    )
  }
}
