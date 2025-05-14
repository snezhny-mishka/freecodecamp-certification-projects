import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons';


const arrowDown = <FontAwesomeIcon icon={faArrowDown} />;
const arrowUp = <FontAwesomeIcon icon={faArrowUp} />;
const playBtn = <FontAwesomeIcon icon={faPlay} />;
const pauseBtn = <FontAwesomeIcon icon={faPause} />;
const resetBtn = <FontAwesomeIcon icon={faRotate} />;

const { useState } = React;
const { useEffect } = React;

function App() {
    const [timeLeft, setTimeLeft] = useState(1500);
  
    const [sessionDuration, setSessionDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);
  
    const [isSession, setIsSession] = useState(true); // T -> session, F - break
    const [timerStarted, setTimerStarted] = useState(false); // T -> timer is on, F - timer is off
  
    // ----------------time formatting
    const formatTimeLeft = () => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      return `${minutes >= 10 ? "" : "0"}${minutes}:${
        seconds >= 10 ? "" : "0"
      }${seconds}`;
    };
  
    // ----------------set session time
    const increaseSessionDuration = () => {
      if (sessionDuration < 60) {
        setSessionDuration(sessionDuration + 1);
        setTimeLeft(timeLeft + 60);
      }
    };
  
    const decreaseSessionDuration = () => {
      if (sessionDuration > 1) {
        setSessionDuration(sessionDuration - 1);
        setTimeLeft(timeLeft - 60);
      }
    };
    // -------------- set break time
    const increaseBreakDuration = () => {
      if (breakDuration < 60) {
        setBreakDuration(breakDuration + 1);
      }
    };
  
    const decreaseBreakDuration = () => {
      if (breakDuration > 1) {
        setBreakDuration(breakDuration - 1);
      }
    };
  
    // start/stop timer
    function handleTimerStarted() {
      setTimerStarted(!timerStarted);
    }
  
    // reset the timer
    function handleResetTimer() {
      setTimerStarted(false);
      setTimeLeft(1500);
      setIsSession(true);
      setSessionDuration(25);
      setBreakDuration(5);
      const audio = document.getElementById("beep");
      audio.pause();
      audio.currentTime = 0;
    }
  
    // switch between session and break
    function timerType() {
  
      if (timeLeft === 0) {
        const audio = document.getElementById("beep");
        if (isSession) {
          audio.currentTime = 0;
          audio.play();
          setTimeLeft(breakDuration * 60);
          setIsSession(false);
        } else {
          setTimeLeft(sessionDuration * 60);
          setIsSession(true);
        }
      }
    }

    function startTimer(timerState) {
      return setInterval(() => {
        if (timerState) {
          setTimeLeft((timeleft) => timeleft - 1);
        }
      }, 1000);
    }
  
    useEffect(() => {
      const interval = startTimer(timerStarted);
      if (timerStarted) {
        timerType();
      }
      return () => clearInterval(interval);
    }, [timerStarted, timeLeft]);
  
    return (
      <div id="main-container">
        <h1>25 + 5 clock</h1>
        <div id="time-setting">
          <Session
            sessionDuration={sessionDuration}
            increase={increaseSessionDuration}
            decrease={decreaseSessionDuration}
          />
          <Break
            breakDuration={breakDuration}
            increase={increaseBreakDuration}
            decrease={decreaseBreakDuration}
          />
        </div>
        <Display
          timeLeft={timeLeft}
          isSession={isSession}
          sessionDuration={sessionDuration}
          breakDuration={breakDuration}
          formatTimeLeft={formatTimeLeft}
        />
        <Controls
          handleTimerStarted={handleTimerStarted}
          handleResetTimer={handleResetTimer}
        />
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
  
  function Break({ breakDuration, increase, decrease }) {
    return (
      <div id="break-label">
        <h3>Break</h3>
        <div id="break-setting-container">
          <button id="break-increment" onClick={increase}>
            {arrowUp}
          </button>
          <div id="break-length">{breakDuration}</div>
          <button id="break-decrement" onClick={decrease}>
            {arrowDown}
          </button>
        </div>
      </div>
    );
  }
  
  function Session({ sessionDuration, increase, decrease }) {
    return (
      <div id="session-label">
        <h3>Session</h3>
        <div id="session-setting-container">
          <button id="session-increment" onClick={increase}>
            {arrowUp}
          </button>
          <div id="session-length">{sessionDuration}</div>
          <button id="session-decrement" onClick={decrease}>
            {arrowDown}
          </button>
        </div>
      </div>
    );
  }
  
  function Display({ timeLeft, isSession, formatTimeLeft }) {
    return (
      <div id="display-container">
        <h2 id="timer-label">{isSession ? "Session" : "Break"}</h2>
        <div id="time-left">{formatTimeLeft()}</div>
      </div>
    );
  }
  
  function Controls({ handleTimerStarted, handleResetTimer }) {
    return (
      <div id="controls-container">
        <button id="start_stop" onClick={handleTimerStarted}>
          {playBtn}{pauseBtn}
        </button>
        <button id="reset" onClick={handleResetTimer}>
          {resetBtn}
        </button>
      </div>
    );
  }

export default App;
