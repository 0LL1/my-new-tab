import React, { useState, useEffect, useRef } from 'react'
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

const Stopwatch = () => {
  const { time, isRunning, start, stop, clear } = useStopwatch()

  useEffect(() => {
    const soundInterval = Math.floor(time / 10)

    if (isRunning && !(soundInterval % 1000)) {
      const sound = new Audio(pop)
      sound.play()
    }
  })

  const hundreths = milliseconds => {
    return Math.floor((milliseconds / 10) % 100)
      .toString()
      .padStart(2, '0')
  }

  const seconds = milliseconds => {
    return Math.floor((milliseconds / 1000) % 60)
      .toString()
      .padStart(2, '0')
  }

  const minutes = milliseconds => {
    return Math.floor((milliseconds / 60000) % 60)
      .toString()
      .padStart(2, '0')
  }

  return (
    <StyledStopwatch>
      <Title>stopwatch</Title>
      <StyledTime>
        <LeftTime>{minutes(time)}</LeftTime>
        <MiddleTime>{seconds(time)}</MiddleTime>
        <RightTime>{hundreths(time)}</RightTime>
      </StyledTime>
      {!isRunning ? (
        <Start onClick={start}>start</Start>
      ) : (
        <Stop onClick={stop}>stop</Stop>
      )}
      <Clear onClick={clear} disabled={false}>
        clear
      </Clear>
    </StyledStopwatch>
  )
}

export default Stopwatch

const useStopwatch = () => {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const intervalRef = useRef()

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time
      const interval = setInterval(() => {
        setTime(Date.now() - startTime)
      }, 10)
      intervalRef.current = interval
    }
    return () => clearInterval(intervalRef.current)
  })

  return {
    time,
    isRunning,
    start: () => setIsRunning(true),
    stop: () => setIsRunning(false),
    clear: () => {
      clearInterval(intervalRef.current)
      setTime(0)
      setIsRunning(false)
    }
  }
}
