import React from 'react'
import Typing from '../../images/loader.gif'
export default class Loader extends React.Component {
  render() {
    return (
      <div className="loader center">
        <img src={Typing} alt="loading" />
      </div>
    )
  }
}
