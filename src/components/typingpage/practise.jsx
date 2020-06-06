import React from 'react'
import { fetchPara, userlog } from '../../helpers/api'
import { Button } from 'react-bootstrap'
export default class Practise extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showPara: false,
      displaypara: '',
    }
  }

  componentDidMount() {
    this.setState({
      showPara: false,
    })
  }

  parafetch = (event) => {
    event.preventDefault()
    this.setState({
      showPara: true,
    })
    fetchPara()
      .then((res) => {
        console.log(res)
        const paradetails = res.data.para
        this.setState({
          displaypara: paradetails,
        })
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  submituserText = (event) => {
    console.log('will be submitted')
  }

  render() {
    const { showPara, displaypara } = this.state
    return (
      <div>
        {showPara == false && (
          <div>
            <Button className="readybtn" onClick={this.parafetch}>
              Ready
            </Button>
          </div>
        )}

        {showPara && (
          <div>
            <div className="parafetch">{displaypara}</div>
            <div>
              <input
                type="text"
                className="userText"
                name="usertext"
                placeholder="type here"
              />
            </div>
            <Button
              type="submit"
              className="submitBtn"
              onClick={this.submituserText}>
              Submit
            </Button>
          </div>
        )}
      </div>
    )
  }
}
