import React, { Component } from 'react'
import { GlobalStyle, StyledApp } from './styles'
import Stopwatch from './Stopwatch'

class App extends Component {
  render() {
    return (
      <StyledApp>
        <GlobalStyle />
        <Stopwatch />
      </StyledApp>
    )
  }
}

export default App
