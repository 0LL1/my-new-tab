import React, { useState, useEffect, useRef } from 'react'
import {
  StyledTimer,
  Title,
  HoursInput,
  MinutesInput,
  SecondsInput,
  StyledTime,
  LeftTime,
  MiddleTime,
  RightTime,
  Start,
  Stop,
  Clear
} from './styles'
import alarm from './assets/alarm.mp3'

const Timer = () => {
  const {
    isRunning,
    isStopped,
    hours,
    minutes,
    seconds,
    setHours,
    setMinutes,
    setSeconds,
    zeroPad,
    start,
    stop,
    clear,
    secondsRemaining
  } = useTimer()

  useEffect(() => {
    if (isRunning) {
      document.title = `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(
        seconds
      )}`
    }
    return () => {
      document.title = 'My new tab'
    }
  })

  useEffect(() => {
    if (secondsRemaining <= 0) {
      const sound = new Audio(alarm)
      sound.play()
    }
  })

  return (
    <StyledTimer>
      <Title>timer</Title>
      <StyledTime>
        {isRunning || isStopped ? (
          <>
            <LeftTime>{zeroPad(hours)}</LeftTime>
            <MiddleTime>{zeroPad(minutes)}</MiddleTime>
            <RightTime>{zeroPad(seconds)}</RightTime>
          </>
        ) : (
          <>
            <label>
              hours
              <HoursInput
                onChange={e => setHours(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && start()}
                value={hours}
                name="hours"
                type="number"
                min="0"
                max="24"
              />
            </label>
            <label>
              minutes
              <MinutesInput
                onChange={e => setMinutes(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && start()}
                value={minutes}
                name="minutes"
                type="number"
                min="0"
                max="59"
              />
            </label>
            <label>
              seconds
              <SecondsInput
                onChange={e => setSeconds(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && start()}
                value={seconds}
                name="seconds"
                type="number"
                min="0"
                max="59"
              />
            </label>
          </>
        )}
      </StyledTime>
      {!isRunning ? (
        <Start onClick={start}>start</Start>
      ) : (
        <Stop onClick={stop}>stop</Stop>
      )}
      <Clear onClick={clear} disabled={!(hours + minutes + seconds)}>
        clear
      </Clear>
    </StyledTimer>
  )
}

export default Timer

const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [isStopped, setIsStopped] = useState(false)
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const intervalRef = useRef()
  const secondsRemaining = useRef()

  const clear = () => {
    clearInterval(intervalRef.current)
    setHours('')
    setMinutes('')
    setSeconds('')
    setIsRunning(false)
  }

  const zeroPad = time => {
    return time.toString().padStart(2, '0')
  }

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now()
      const calculatedSeconds = hours * 3600 + minutes * 60 + seconds

      const interval = setInterval(() => {
        secondsRemaining.current =
          calculatedSeconds - Math.floor((Date.now() - startTime) / 1000)

        setHours(Math.floor(secondsRemaining.current / 3600))
        setMinutes(Math.floor((secondsRemaining.current / 60) % 60))
        setSeconds(secondsRemaining.current % 60)

        if (secondsRemaining.current <= 0) {
          clear()
        }
      }, 1000)
      intervalRef.current = interval
    }
    return () => clearInterval(intervalRef.current)
  })

  return {
    isRunning,
    isStopped,
    hours,
    minutes,
    seconds,
    setHours,
    setMinutes,
    setSeconds,
    zeroPad,
    start: () => {
      setIsRunning(true)
      setIsStopped(false)
    },
    stop: () => {
      setIsRunning(false)
      setIsStopped(true)
    },
    clear,
    secondsRemaining: secondsRemaining.current
  }
}
