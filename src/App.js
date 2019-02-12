import React, { Component } from 'react'
import { GlobalStyle, StyledApp } from './styles'
import Stopwatch from './Stopwatch'
import Timer from './Timer'

class App extends Component {
  render() {
    return (
      <StyledApp>
        <GlobalStyle />
        <Stopwatch />
        <Timer />
      </StyledApp>
    )
  }
}

export default App
