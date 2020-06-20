import React, { Component } from 'react'
import './card.css'

export default class Card extends Component {
  state = {}

  render() {
    return (
      <div className="card-container">
        <h3>
          WPM <br />
          <span className="dashScore">135</span>
        </h3>
        <span class="divider"></span>
        <h3>
          Accuracy <br />
          <span className="dashScore">96%</span>
        </h3>
        <span class="divider"></span>
        <h3>
          Number of Races <br />
          <span className="dashScore">135</span>
        </h3>
        <span class="divider"></span>
        <h3>
          Streak <br />
          <span className="dashScore">95</span>
        </h3>
      </div>
    )
  }
}
