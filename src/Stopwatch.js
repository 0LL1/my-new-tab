import React, { useState, useEffect, useRef } from "react";
import {
  StyledStopwatch,
  Title,
  StyledTime,
  LeftTime,
  MiddleTime,
  RightTime,
  Start,
  Stop,
  Clear,
} from "./styles";
import pop from "./assets/pop.mp3";

const Stopwatch = () => {
  const { time, isRunning, start, stop, clear } = useStopwatch();

  useEffect(() => {
    const soundInterval = Math.floor(time / 10);

    if (isRunning && !(soundInterval % 1000)) {
      const sound = new Audio(pop);
      sound.play();
    }
  });

  const hundreths = (milliseconds) => {
    return Math.floor((milliseconds / 10) % 100)
      .toString()
      .padStart(2, "0");
  };

  const seconds = (milliseconds) => {
    return Math.floor((milliseconds / 1000) % 60)
      .toString()
      .padStart(2, "0");
  };

  const minutes = (milliseconds) => {
    return Math.floor((milliseconds / 60000) % 60)
      .toString()
      .padStart(2, "0");
  };

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
      <Clear onClick={clear} disabled={!time}>
        clear
      </Clear>
    </StyledStopwatch>
  );
};

export default Stopwatch;

const useStopwatch = () => {
  const [startTime, setStartTime] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef();

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
      intervalRef.current = interval;
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, startTime, time]);

  const start = () => {
    setStartTime(Date.now() - time);
    setIsRunning(true);
  };

  const stop = () => setIsRunning(false);

  const clear = () => {
    setIsRunning(false);
    setTime(0);
    clearInterval(intervalRef.current);
  };

  return {
    time,
    isRunning,
    start,
    stop,
    clear,
  };
};
