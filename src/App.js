import React, { Component } from 'react'
import { GlobalStyle, StyledApp } from './styles'
import Stopwatch from './Stopwatch'
import Timer from './Timer'
import Barca from './Barca'
import MainTasks from './MainTasks'

class App extends Component {
  render() {
    return (
      <StyledApp>
        <GlobalStyle />
        <Stopwatch />
        <Timer />
        <Barca />
        <MainTasks />
      </StyledApp>
    )
  }
}

export default App
