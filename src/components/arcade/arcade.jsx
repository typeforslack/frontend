import React from 'react'
import { fetchPara } from '../../helpers/api'
import { Button } from 'react-bootstrap'
import './arcade.css'
import Timer from '../Timer/timer'

export default class Arcade extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      isParaLoading: false,
      paragraph: '',
      paraID: null,
      counter: 60,
    }

    this.timer = 0
  }

  componentDidMount() {
    this.timer = setInterval(() => this.countDown(this.state.counter), 1000)
  }

  countDown = (countdown) => {
    if (countdown == 0) {
      clearInterval(this.timer)
    } else {
      let secondleft = countdown - 1
      this.setState({
        counter: secondleft,
      })
    }
  }

  parafetch = async (event) => {
    event.preventDefault()
    this.setState({
      isParaLoading: true,
    })

    try {
      const response = await fetchPara()
      console.log(response)
      const { para, id } = response.data
      this.setState({
        paragraph: para,
        paraID: id,
        isReady: true,
      })
    } catch (error) {
      alert('Oops error happened')
    }

    this.setState({
      isParaLoading: false,
    })
  }

  render() {
    const { isReady, isParaLoading, paragraph, counter } = this.state
    return (
      <div>
        <div>
          {!isReady && (
            <div>
              <Button className="readybtn" onClick={this.parafetch}>
                {isParaLoading ? 'Loading...' : 'Ready'}
              </Button>
            </div>
          )}
          {paragraph && counter != 0 && (
            <div>
              <div className="parafetch">
                <span className="remaining">{paragraph}</span>
              </div>
              <div>
                <input
                  id="textref"
                  className="userText"
                  placeholder="type here"
                  autoFocus
                />
              </div>
              Timer:{counter}
            </div>
          )}
          {counter == 0 && <div>Results</div>}
        </div>
      </div>
    )
  }
}
