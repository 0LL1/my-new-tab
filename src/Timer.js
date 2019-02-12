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
    hours: 0,
    minutes: 0,
    seconds: 0,
    running: false
  }

  timer = null
  now = 0

  setTime = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  toggleRunning = () => {
    !this.state.running ? this.start() : this.stop()
  }

  start = () => {
    const start = Date.now()

    this.timer = setInterval(() => {
      this.setState(prevState => {
        console.log(
          this.state.seconds - Math.floor((Date.now() - start) / 1000)
        )
      })
    }, 1000)

    this.setState({ running: true })
  }

  stop = () => {
    clearInterval(this.timer)
    this.timer = null
    this.setState({ running: false })
  }

  clear = () => {
    this.stop()
    this.now = 0
    this.setState({ hours: 0, minutes: 0, seconds: 0 })
  }

  playAlarm = () => {
    const sound = new Audio(alarm)
    sound.play()
  }

  zeroPad = time => {
    return time.toString().padStart(2, '0')
  }

  render() {
    return (
      <StyledTimer>
        <Title>timer</Title>
        {this.state.running ? (
          <StyledTime>
            <TimerHours>{this.zeroPad(this.state.hours)}</TimerHours>
            <TimerMinutes>{this.zeroPad(this.state.minutes)}</TimerMinutes>
            <TimerSeconds>{this.zeroPad(this.state.seconds)}</TimerSeconds>
          </StyledTime>
        ) : (
          <TimerInputField>
            <label>
              hours
              <HoursInput
                onChange={this.setTime}
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
                onChange={this.setTime}
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
                onChange={this.setTime}
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
