import React, { Component } from 'react'
import {
  StyledStopwatch,
  Title,
  StyledTime,
  LeftTime,
  MiddleTime,
  RightTime,
  Start,
  Stop,
  Clear
} from './styles'
import pop from './assets/pop.mp3'

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

  start = () => {
    this.now = Date.now() - this.state.time
    this.setState({ running: true })

    this.timer = setInterval(() => {
      this.setState({
        time: Date.now() - this.now
      })
      const soundInterval = Math.floor(this.state.time / 10)
      !(soundInterval % 1000) && this.playSound()
    }, 10)
  }

  stop = () => {
    clearInterval(this.timer)
    this.timer = null
    this.setState({ running: false })
  }

  clear = () => {
    this.stop()
    this.now = 0
    this.setState({ time: 0 })
  }

  playSound = () => {
    const sound = new Audio(pop)
    sound.play()
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
    const { time, running } = this.state

    return (
      <StyledStopwatch>
        <Title>stopwatch</Title>
        <StyledTime>
          <LeftTime>{this.minutes(time)}</LeftTime>
          <MiddleTime>{this.seconds(time)}</MiddleTime>
          <RightTime>{this.hundreths(time)}</RightTime>
        </StyledTime>
        {!running ? (
          <Start onClick={this.toggleRunning}>start</Start>
        ) : (
          <Stop onClick={this.toggleRunning}>stop</Stop>
        )}
        <Clear onClick={this.clear} disabled={!time}>
          clear
        </Clear>
      </StyledStopwatch>
    )
  }
}

export default Stopwatch
