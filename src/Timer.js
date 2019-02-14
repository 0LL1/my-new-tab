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
      [event.target.name]: parseInt(event.target.value)
    })
  }

  toggleRunning = () => {
    !this.state.running ? this.start() : this.stop()
  }

  start = () => {
    this.setState({ running: true })

    this.now = Date.now()

    const calculatedSeconds =
      this.state.hours * 3600 + this.state.minutes * 60 + this.state.seconds

    this.timer = setInterval(() => {
      let secondsRemaining =
        calculatedSeconds - Math.floor((Date.now() - this.now) / 1000)

      this.setState({
        hours: Math.floor(secondsRemaining / 3600),
        minutes: Math.floor((secondsRemaining / 60) % 60),
        seconds: secondsRemaining % 60
      })

      if (
        calculatedSeconds <= 0 ||
        (this.state.hours <= 0 &&
          this.state.minutes <= 0 &&
          this.state.seconds <= 0)
      ) {
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
        <Title onClick={this.playAlarm}>timer</Title>
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
                value={this.zeroPad(this.state.hours)}
                name="hours"
                type="number"
                min="0"
                max="24"
              />
            </label>
            <label>
              minutes
              <MinutesInput
                onChange={this.setTime}
                value={this.zeroPad(this.state.minutes)}
                name="minutes"
                type="number"
                min="0"
                max="59"
              />
            </label>
            <label>
              seconds
              <SecondsInput
                onChange={this.setTime}
                value={this.zeroPad(this.state.seconds)}
                name="seconds"
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
