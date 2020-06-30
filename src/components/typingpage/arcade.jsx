import React from 'react'
import { fetchPara, postUserlog } from '../../helpers/api'
import { WordArena } from '../arena'
import Result from '../arena/components/result'
import { Button } from 'react-bootstrap'
import { evaluateArcade } from '../../helpers/calculations'

import './practise.css'

const DEFAULT_STATE = {
  isReady: false,
  isParaLoading: false,
  paragraph: '',
  paraID: null,
  result: null,
}
export default class Arcade extends React.Component {
  state = DEFAULT_STATE

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

  evaluate = async (paraWords, secondsSinceStart) => {
    const result = evaluateArcade(paraWords, secondsSinceStart)
    this.setState({
      result,
    })

    try {
      await postUserlog({
        para: this.state.paraID,
        wpm: result.correctWpm,
        taken_at: new Date().toISOString(),
        correct_words: result.rightCount,
        wrong_words: result.wrongcount,
        total_words: result.totalWords,
        accuracy: result.accuracy,
      })
    } catch (e) {
      console.log(e.response)
    }
  }

  retry = () => {
    this.setState(DEFAULT_STATE)
  }

  render() {
    const { isReady, isParaLoading, paragraph, paraID, result } = this.state
    return (
      <div>
        {!isReady && (
          <div>
            <Button className="readybtn" onClick={this.parafetch}>
              {isParaLoading ? 'Loading...' : 'Ready'}
            </Button>
          </div>
        )}

        {paragraph && !result && (
          <WordArena
            paragraph={paragraph}
            paraID={paraID}
            countdown={60}
            evaluateResult={this.evaluate}
          />
        )}

        {result && <Result retry={this.retry} {...result} />}
      </div>
    )
  }
}
