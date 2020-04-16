import React, { useState, useEffect, useRef } from "react";
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
  Clear,
} from "./styles";
import alarm from "./assets/alarm.mp3";

const Timer = () => {
  const {
    isRunning,
    hours,
    minutes,
    seconds,
    setHours,
    setMinutes,
    setSeconds,
    start,
    stop,
    clear,
    zeroPad,
  } = useTimer();

  useEffect(() => {
    if (isRunning) {
      document.title = `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(
        seconds
      )}`;
    }
    return () => {
      document.title = "My new tab";
    };
  });

  return (
    <StyledTimer>
      <Title>timer</Title>
      <StyledTime>
        {isRunning ? (
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
                onChange={(e) => setHours(parseInt(e.target.value))}
                onKeyDown={(e) => e.key === "Enter" && start()}
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
                onChange={(e) => setMinutes(parseInt(e.target.value))}
                onKeyDown={(e) => e.key === "Enter" && start()}
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
                onChange={(e) => setSeconds(parseInt(e.target.value))}
                onKeyDown={(e) => e.key === "Enter" && start()}
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
        <Start onClick={start} disabled={!(hours + minutes + seconds)}>
          start
        </Start>
      ) : (
        <Stop onClick={stop}>stop</Stop>
      )}
      <Clear onClick={clear} disabled={!(hours + minutes + seconds)}>
        clear
      </Clear>
    </StyledTimer>
  );
};

export default Timer;

const useTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [startSeconds, setStartSeconds] = useState(0);

  const intervalRef = useRef();

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        const secondsRemaining = startSeconds - elapsedSeconds;

        setHours(Math.floor(secondsRemaining / 3600));
        setMinutes(Math.floor((secondsRemaining / 60) % 60));
        setSeconds(secondsRemaining % 60);

        if (secondsRemaining <= 0) {
          clear();
          const sound = new Audio(alarm);
          sound.play();
        }
      }, 1000);
      intervalRef.current = interval;
    }
    return () => clearInterval(intervalRef.current);
  });

  const start = () => {
    setStartTime(Date.now());
    setIsRunning(true);

    const startHours = hours || 0;
    const startMinutes = minutes || 0;
    const startSeconds = seconds || 0;

    const calculatedSeconds =
      startHours * 3600 + startMinutes * 60 + startSeconds;

    setStartSeconds(calculatedSeconds);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const clear = () => {
    clearInterval(intervalRef.current);
    setHours("");
    setMinutes("");
    setSeconds("");
    setIsRunning(false);
  };

  const zeroPad = (time) => {
    return time.toString().padStart(2, "0");
  };

  return {
    isRunning,
    hours,
    minutes,
    seconds,
    setHours,
    setMinutes,
    setSeconds,
    start,
    stop,
    clear,
    zeroPad,
  };
};
