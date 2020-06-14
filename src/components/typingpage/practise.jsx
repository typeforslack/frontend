import React from 'react'
import { fetchPara } from '../../helpers/api'
import { PracticeArena } from '../arena'
import { Button } from 'react-bootstrap'
import './practise.css'

export default class Practise extends React.Component {
  state = {
    isReady: false,
    isParaLoading: false,
    paragraph: '',
    paraID: null,
    strictMode: 'true',
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

  handleOptionChange = (e) => {
    this.setState({
      strictMode: e.target.value,
    })
  }

  render() {
    const { isReady, isParaLoading, paragraph, paraID, strictMode } = this.state
    return (
      <div>
        {!isReady && (
          <>
            <center>
              <h3>Ready to increase your toughness?</h3>
              <h4>Use strict mode.</h4>
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
            <div>
              <Button className="readybtn" onClick={this.parafetch}>
                {isParaLoading ? 'Loading...' : 'Ready'}
              </Button>
            </div>
          </>
        )}

        {paragraph && (
          <PracticeArena
            paragraph={paragraph}
            paraID={paraID}
            strictMode={strictMode === 'true'}
          />
        )}
      </div>
    )
  }
}
