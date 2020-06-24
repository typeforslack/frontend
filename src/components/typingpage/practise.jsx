import React from 'react'
import { fetchPara, postUserlog } from '../../helpers/api'
import { LetterArena, WordArena } from '../arena'
import Result from '../arena/result'
import { evaluateArcade, evaluateTyping } from '../../helpers/calculations'
import { Button } from 'react-bootstrap'
import './practise.css'

const DEFAULT_STATE = {
  isReady: false,
  isParaLoading: false,
  paragraph: '',
  paraID: null,
  strictMode: 'true',
  result: false,
}

export default class Practise extends React.Component {
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

  evaluate = async (typed, secondsSinceStart) => {
    const result =
      this.state.strictMode === 'true'
        ? evaluateTyping(this.state.paragraph, typed, secondsSinceStart)
        : evaluateArcade(typed, secondsSinceStart)

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

  handleOptionChange = (e) => {
    this.setState({
      strictMode: e.target.value,
    })
  }

  retry = () => this.setState(DEFAULT_STATE)

  render() {
    const {
      isReady,
      isParaLoading,
      paragraph,
      paraID,
      strictMode,
      result,
    } = this.state

    return (
      <div>
        {!isReady && (
          <>
            <center>
              <h3>Ready to increase your toughness?</h3>
              <h4>Choose mode.</h4>
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="true"
                  checked={strictMode === 'true'}
                  onChange={this.handleOptionChange}
                />
                Yes strict mode. 😼
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="false"
                  checked={strictMode === 'false'}
                  onChange={this.handleOptionChange}
                />
                No I'm not ready yet. 😔
              </label>
            </center>
            <div className="strictMode">
              <h3>Strict Mode </h3>
              <ul>
                <li>A realtime typing experience</li>
                <li>On making errors the letter gets highlighted as red</li>
                <li>
                  On writing correct words the letter is highlighted as green
                </li>
                <li>The word doesnt vanish away on from textfield</li>
              </ul>
            </div>
            <div className="easyMode">
              <h3>Easy Mode </h3>
              <ul>
                <li>To give a basic practise on typing</li>
                <li>
                  Have to write all the words correct else it will keep
                  highlighting error{' '}
                </li>
                <li>
                  On writing correct the word turns green and jumps to the next
                  word
                </li>
              </ul>
            </div>
            <div>
              <Button className="readybtn" onClick={this.parafetch}>
                {isParaLoading ? 'Loading...' : 'Ready'}
              </Button>
            </div>
          </>
        )}

        {paragraph && strictMode === 'true' && !result && (
          <LetterArena
            paragraph={paragraph}
            paraID={paraID}
            evaluateResult={this.evaluate}
          />
        )}

        {paragraph && strictMode === 'false' && !result && (
          <WordArena
            paragraph={paragraph}
            paraID={paraID}
            letterComparison={true}
            evaluateResult={this.evaluate}
          />
        )}

        {result && <Result retry={this.retry} {...result} />}
      </div>
    )
  }
}
