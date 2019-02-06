import React, { Component } from 'react'
import {
  StyledStopwatch,
  Title,
  StyledTime,
  Minutes,
  Seconds,
  Hundreths,
  Start,
  Stop,
  Clear
} from './styles'

class Stopwatch extends Component {
  state = {
    time: 0,
    running: false
  }

  timer = null
  now = 0

  toggleRunning = () => {
    !this.state.running ? this.start() : this.stop()
  }

  start() {
    this.timer = setInterval(() => {
      this.setState({
        time: Date.now() - this.now
      })
    }, 1)

    this.now = Date.now() - this.state.time
    this.setState({ running: true })
  }
  stop() {
    clearInterval(this.timer)
    this.timer = null
    this.setState({ running: false })
  }

  clear = () => {
    this.stop()
    this.now = 0
    this.setState({ time: 0 })
  }

  hundreths = milliseconds => {
    return Math.floor((milliseconds / 10) % 100)
      .toString()
      .padStart(2, '0')
  }

  seconds = milliseconds => {
    return Math.floor((milliseconds / 1000) % 60)
      .toString()
      .padStart(2, '0')
  }

  minutes = milliseconds => {
    return Math.floor((milliseconds / 60000) % 60)
      .toString()
      .padStart(2, '0')
  }

  render() {
    return (
      <StyledStopwatch>
        <Title>stopwatch</Title>
        <StyledTime>
          <Minutes>{this.minutes(this.state.time)}</Minutes>
          <Seconds>{this.seconds(this.state.time)}</Seconds>
          <Hundreths>{this.hundreths(this.state.time)}</Hundreths>
        </StyledTime>
        {!this.state.running ? (
          <Start onClick={this.toggleRunning}>start</Start>
        ) : (
          <Stop onClick={this.toggleRunning}>stop</Stop>
        )}
        <Clear onClick={this.clear}>clear</Clear>
      </StyledStopwatch>
    )
  }
}

export default Stopwatch
