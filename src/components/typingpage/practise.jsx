import React from 'react'
import { fetchPara } from '../../helpers/api'
import TypingArena from '../common/arena'
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
      console.log(response)
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

        {paragraph && <TypingArena paragraph={paragraph} />}
      </div>
    )
  }
}
