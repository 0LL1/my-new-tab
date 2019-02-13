import React, { Component } from 'react'
import {
  StyledTimer,
  Title,
  TimerInputField,
  HoursInput,
  MinutesInput,
  SecondsInput,
  StyledTime,
  TimerHours,
  TimerMinutes,
  TimerSeconds,
  Start,
  Stop,
  Clear
} from './styles'
import alarm from './assets/alarm.mp3'

class Stopwatch extends Component {
  state = {
    seconds: 0,
    running: false
  }

  timer = null
  now = 0

  setSeconds = event => {
    const secondsToAdd = parseInt(event.target.value)
    this.setState({
      seconds: secondsToAdd
    })
  }

  setMinutes = event => {
    const secondsToAdd = event.target.value * 60
    this.setState({
      seconds: secondsToAdd
    })
  }

  setHours = event => {
    const secondsToAdd = event.target.value * 3600
    this.setState({
      seconds: secondsToAdd
    })
  }

  toggleRunning = () => {
    !this.state.running ? this.start() : this.stop()
  }

  start = () => {
    this.now = Date.now()
    const secondsRemaining = this.state.seconds
    this.setState({ running: true })

    this.timer = setInterval(() => {
      this.setState({
        seconds: secondsRemaining - Math.floor((Date.now() - this.now) / 1000)
      })
      if (this.state.seconds <= 0) {
        this.clear()
        this.playAlarm()
      }
    }, 1000)
  }

  stop = () => {
    clearInterval(this.timer)
    this.timer = null
    this.setState({ running: false })
  }

  clear = () => {
    this.stop()
    this.now = 0
    this.setState({ seconds: 0 })
  }

  playAlarm = () => {
    const sound = new Audio(alarm)
    sound.play()
  }

  zeroPad = time => {
    return time.toString().padStart(2, '0')
  }

  seconds = seconds => {
    return Math.floor((seconds / 1) % 60)
      .toString()
      .padStart(2, '0')
  }

  minutes = seconds => {
    return Math.floor((seconds / 60) % 60)
      .toString()
      .padStart(2, '0')
  }

  hours = seconds => {
    return Math.floor((seconds / 3600) % 60)
      .toString()
      .padStart(2, '0')
  }

  render() {
    return (
      <StyledTimer>
        <Title onClick={this.playAlarm}>timer</Title>
        {this.state.running ? (
          <StyledTime>
            <TimerHours>{this.hours(this.state.seconds)}</TimerHours>
            <TimerMinutes>{this.minutes(this.state.seconds)}</TimerMinutes>
            <TimerSeconds>{this.seconds(this.state.seconds)}</TimerSeconds>
          </StyledTime>
        ) : (
          <TimerInputField>
            <label>
              hours
              <HoursInput
                onChange={this.setHours}
                value={this.hours(this.state.seconds)}
                name="hours"
                maxLength="2"
                type="number"
                min="0"
                max="24"
              />
            </label>
            <label>
              minutes
              <MinutesInput
                onChange={this.setMinutes}
                value={this.minutes(this.state.seconds)}
                name="minutes"
                maxLength="2"
                type="number"
                min="0"
                max="59"
              />
            </label>
            <label>
              seconds
              <SecondsInput
                onChange={this.setSeconds}
                value={this.seconds(this.state.seconds)}
                name="seconds"
                maxLength="2"
                type="number"
                min="0"
                max="59"
              />
            </label>
          </TimerInputField>
        )}
        {!this.state.running ? (
          <Start onClick={this.toggleRunning}>start</Start>
        ) : (
          <Stop onClick={this.toggleRunning}>stop</Stop>
        )}
        <Clear onClick={this.clear}>clear</Clear>
      </StyledTimer>
    )
  }
}

export default Stopwatch
