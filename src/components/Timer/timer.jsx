// import React from 'react'
// import Arcade from '../arcade/arcade'

// export default class Timer extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       counter: 60,
//     }
//     this.timer = 0
//   }

//   componentDidMount() {
//     this.timer = setInterval(() => this.countDown(this.state.counter), 1000)
//   }

//   countDown = (countdown) => {
//     if (countdown == 0) {
//       alert("time's up")
//       clearInterval(this.timer)
//     } else {
//       let secondleft = countdown - 1
//       this.setState({
//         counter: secondleft,
//       })
//     }
//   }

//   render() {
//     const { counter } = this.state

//     return <div>{this.props.getTime(counter)} </div>
//   }
// }
