import React, { Component } from 'react'
import './card.css'

export default class Card extends Component {
  state = {}

  render() {
    return (
      <div className="card-container">
        <br />
        <h2>{this.props.title}</h2>
      </div>
    )
  }
}
