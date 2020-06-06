import React from 'react'
import { fetchPara } from '../../helpers/api'
import { Button } from 'react-bootstrap'
import './practise.css'

export default class Practise extends React.Component {
  state = {
    isReady: false,
    isParaLoading: false,
    paragraph: '',
  }

  parafetch = async (event) => {
    event.preventDefault()
    this.setState({
      isParaLoading: true,
    })

    try {
      const response = await fetchPara()
      const { para } = response.data
      this.setState({
        paragraph: para,
        isReady: true,
      })
    } catch (error) {
      alert('Oops error happened')
    }

    this.setState({
      isParaLoading: false,
    })
  }

  submituserText = (event) => {
    console.log('will be submitted')
  }

  render() {
    const { isReady, isParaLoading, paragraph } = this.state
    return (
      <div>
        {!isReady && (
          <div>
            <Button className="readybtn" onClick={this.parafetch}>
              {isParaLoading ? 'Loading...' : 'Ready'}
            </Button>
          </div>
        )}

        {paragraph && (
          <div>
            <div className="parafetch">{paragraph}</div>
            <div>
              <input
                type="text"
                className="userText"
                name="usertext"
                placeholder="type here"
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}
