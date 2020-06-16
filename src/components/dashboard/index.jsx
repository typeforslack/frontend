import React, { Component } from 'react'
import LineChart from '../common/lineChart'
import Card from './card'
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap'
// import { LineChart } from './lineChart'
import './card.css'

export default class Dashboard extends Component {
  state = {}

  render() {
    const indicator = document.querySelector('.nav-indicator')
    const items = document.querySelectorAll('.nav-item')

    const handleIndicator = (el) => {
      items.forEach((item) => {
        item.classList.remove('is-active')
        item.removeAttribute('style')
      })

      indicator.style.width = `${el.offsetWidth}px`
      indicator.style.left = `${el.offsetLeft}px`
      indicator.style.backgroundColor = el.getAttribute('active-color')

      el.classList.add('is-active')
      el.style.color = el.getAttribute('active-color')
    }
    items.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        handleIndicator(e.target)
      })
      item.classList.contains('is-active') && handleIndicator(item)
    })

    return (
      <div>
        <nav class="nav">
          <a href="#" class="nav-item is-active" active-color="orange">
            TypeForSlack
          </a>
          <a href="#" class="nav-item" active-color="green">
            Dashboard
          </a>
          <a href="#" class="nav-item" active-color="blue">
            Practice
          </a>
          <a href="#" class="nav-item" active-color="red">
            Arcade
          </a>
          <a href="#" class="nav-item" active-color="rebeccapurple">
            Race
          </a>
          <span class="nav-indicator"></span>
        </nav>
        <br />
        <br />
        <Container>
          <Row>
            <Col>
              <Card title="🔥 Streak" />
            </Col>
            <Col>
              <Card title="Accuracy" />
            </Col>
            <Col>
              <Card title="WPM" />
            </Col>
            <Col>
              <Card />
            </Col>
          </Row>
        </Container>
        <LineChart width={460} height={400} />
      </div>
    )
  }
}
