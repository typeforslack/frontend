import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { navigate } from '@reach/router'
import { signup } from '../../helpers/api'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {
        username: '',
        password: '',
        email: '',
      },
    }
  }

  handleInput = (stateName) => (e) => {
    e.preventDefault()
    this.setState({
      [stateName]: e.target.value.trim(),
    })
  }

  submitForm = async (event) => {
    event.preventDefault()

    const { username: name, password: pwd, email } = this.state

    if (!pwd && !name) {
      this.setState({
        errors: {
          username: 'Username not entered',
          password: 'Password not entered',
          email: 'Email not entered',
        },
      })
    } else if (!pwd) {
      this.setState({
        errors: {
          password: 'Password not entered',
        },
      })
    } else if (!name) {
      this.setState({
        errors: {
          username: 'Username not entered',
        },
      })
    } else if (!email) {
      this.setState({
        errors: {
          email: 'Email not entered',
        },
      })
    } else {
      var obj = {
        username: name,
        email: email,
        password: pwd,
      }

      try {
        const result = await signup(obj)
        if (result.status == 200) {
          console.log(result)
          navigate('/')
        }
      } catch (error) {
        console.log(error.response)
        const errorstatus = error.response
        const errorKeys = Object.keys(errorstatus.data.error)
        const errorvalues = Object.values(errorstatus.data.error)
        if (errorKeys.length == 1) {
          if (errorKeys[0] == 'username') {
            console.log('check1')
            this.setState({
              errors: {
                username: errorvalues[0],
              },
            })
          } else {
            console.log('check2')
            this.setState({
              errors: {
                email: errorvalues[0],
              },
            })
          }
        } else if (errorKeys.length == 2) {
          console.log('check3')
          this.setState({
            errors: {
              username: errorvalues[0],
              email: errorvalues[1],
            },
          })
        }
        return errorstatus
      }
    }
  }

  render() {
    return (
      <div className="signup">
        <Form onSubmit={this.submitForm}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <br></br>

            <Form.Control
              id="txtbox"
              type="text"
              placeholder="Enter username"
              onChange={this.handleInput('username')}
            />
            {
              <h6 style={{ color: 'red', fontSize: '16px' }}>
                {this.state.errors.username}
              </h6>
            }
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <br></br>

            <Form.Control
              id="txtbox"
              type="text"
              placeholder="Enter email"
              onChange={this.handleInput('email')}
            />
            {
              <h6 style={{ color: 'red', fontSize: '16px' }}>
                {this.state.errors.email}
              </h6>
            }
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <br></br>

            <Form.Control
              id="txtbox"
              type="password"
              placeholder="Password"
              onChange={this.handleInput('password')}
            />
            {
              <h6 style={{ color: 'red', fontSize: '16px' }}>
                {this.state.errors.password}
              </h6>
            }
          </Form.Group>
          <Button id="submtBtn" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}
