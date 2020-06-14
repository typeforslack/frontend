import React from 'react'
import { fetchPara } from '../../helpers/api'
import { ArcadeArena } from '../arena'
import { Button } from 'react-bootstrap'
import './practise.css'

export default class Arcade extends React.Component {
  state = {
    isReady: false,
    isParaLoading: false,
    paragraph: '',
    paraID: null,
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
    const { isReady, isParaLoading, paragraph, paraID } = this.state
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
          <ArcadeArena paragraph={paragraph} paraID={paraID} countdown={60} />
        )}
      </div>
    )
  }
}
