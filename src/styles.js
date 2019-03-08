import styled, { createGlobalStyle } from 'styled-components/macro'

export const colors = {
  light: '#ffffff',
  grey: '#666666',
  background: '#222222',
  green: '#2ecc40',
  red: '#db0030',
  yellow: '#ffed02',
  blau: '#004d98',
  grana: '#a50044'
}

export const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${colors.background};
    font-size: 16px;
  }
  body {
    display: grid;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${colors.light};
  }
  button:focus {
    outline: none;
  }
`

export const StyledApp = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  @media (max-width: 850px) {
    display: flex;
    flex-direction: column;
  }
`

// Stopwatch
export const StyledStopwatch = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  width: 16rem;
  height: 16rem;
  padding: 2rem;
  border: solid 0.1rem;
  border-radius: 50%;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  text-align: center;
`

export const Title = styled.div`
  grid-area: 1 / 1 / 2 / 3;
  font-size: 2rem;
  font-weight: normal;
  color: ${colors.grey};
`

export const StyledTime = styled.div`
  grid-area: 2 / 1 / 3 / 3;
  display: grid;
  align-items: center;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  font-weight: normal;
`

export const Minutes = styled.div`
  grid-column: 1 / 2;
  font-size: 3rem;
`

export const Seconds = styled.div`
  grid-column: 2 / 3;
  font-size: 4rem;
`

export const Hundreths = styled.div`
  grid-column: 3 / 4;
  font-size: 3rem;
`
export const Start = styled.button`
  grid-area: 3 / 1 / 4 / 2;
  font-size: 2rem;
  font-weight: normal;
  background-color: ${colors.background};
  color: ${colors.green};
  border: none;
  transition: all 0.175s ease-in-out;
  :hover {
    font-size: 2.2rem;
  }
`

export const Stop = styled.button`
  grid-area: 3 / 1 / 4 / 2;
  font-size: 2rem;
  font-weight: normal;
  background-color: ${colors.background};
  color: ${colors.red};
  border: none;
  transition: all 0.175s ease-in-out;
  :hover {
    font-size: 2.2rem;
  }
`

export const Clear = styled.button`
  grid-area: 3 / 2 / 4 / 3;
  font-size: 2rem;
  font-weight: normal;
  background-color: ${colors.background};
  color: ${colors.yellow};
  border: none;
  transition: all 0.175s ease-in-out;
  :hover {
    font-size: 2.2rem;
  }
`

//Timer
export const StyledTimer = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  width: 16rem;
  height: 16rem;
  padding: 2rem;
  border: solid 0.1rem;
  border-radius: 50%;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  text-align: center;
`

export const TimerHours = styled.div`
  grid-column: 1 / 2;
  font-size: 3rem;
`

export const TimerMinutes = styled.div`
  grid-column: 2 / 3;
  font-size: 4rem;
`

export const TimerSeconds = styled.div`
  grid-column: 3 / 4;
  font-size: 3rem;
`

export const TimerInputField = styled.div`
  grid-area: 2 / 1 / 3 / 3;
  display: grid;
  align-items: center;
  justify-items: center;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  font-weight: normal;
`

export const HoursInput = styled.input`
  width: 5rem;
  grid-column: 1 / 2;
  font-size: 3rem;
  text-align: center;
  border: 0.1rem dotted;
  background-color: ${colors.background};
  color: ${colors.light};
`

export const MinutesInput = styled.input`
  width: 5rem;
  grid-column: 2 / 3;
  font-size: 3rem;
  text-align: center;
  border: 0.1rem dotted;
  background-color: ${colors.background};
  color: ${colors.light};
`

export const SecondsInput = styled.input`
  width: 5rem;
  grid-column: 3 / 4;
  font-size: 3rem;
  text-align: center;
  border: 0.1rem dotted;
  background-color: ${colors.background};
  color: ${colors.light};
`

//Barca
export const StyledBarca = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  height: 20rem;
  width: 32rem;
  padding: 0;
  border: solid 0.1rem;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  text-align: center;
`

export const HomeTeam = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  color: ${colors.light};
  font-size: 2rem;
`

export const AwayTeam = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  color: ${colors.light};
  font-size: 2rem;
`

export const Competition = styled.div`
  grid-area: 3 / 1 / 4 / 2;
  font-size: 1.5rem;
  color: ${colors.blau};
`

export const Time = styled.div`
  grid-area: 3 / 2 / 4 / 3;
  font-size: 1.5rem;
  color: ${colors.blau};
`

export const Next = styled.button`
  grid-area: 4 / 2 / 5 / 3;
  font-size: 2rem;
  font-weight: normal;
  background-color: ${colors.background};
  color: ${colors.grana};
  border: none;
  transition: all 0.175s ease-in-out;
  :hover {
    font-size: 2.2rem;
  }
`

export const Prev = styled.button`
  grid-area: 4 / 1 / 5 / 2;
  font-size: 2rem;
  font-weight: normal;
  background-color: ${colors.background};
  color: ${colors.grana};
  border: none;
  transition: all 0.175s ease-in-out;
  :hover {
    font-size: 2.2rem;
  }
`

export const Fallback = styled.div`
  grid-area: 2 / 1 / 3 / 2;
  height: 20rem;
  width: 32rem;
  padding: 0;
  border: solid 0.1rem;
  display: grid;
  justify-items: center;
  align-items: center;
  text-align: center;
  font-size: 2rem;
`

//MainTask
export const StyledMainTasks = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  height: 20rem;
  width: 32rem;
  padding: 0;
  border: solid 0.1rem;
  display: grid;
  justify-items: center;
  align-items: center;
  text-align: center;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`

export const TaskInput = styled.input`
  grid-row: 2 / 3;
  width: 30rem;
  font-size: 2rem;
  border: 0.1rem dotted;
  background-color: ${colors.background};
  color: ${colors.light};
`

export const TaskList = styled.div`
  grid-row: 3 / 5;
  width: 30rem;
  height: 100%;
  overflow: scroll;
`

export const Task = styled.div`
  font-size: 2rem;
  text-align: left;
  display: grid;
  grid-template-columns: 2rem 1fr;
  align-items: center;
  .icon {
    grid-column: 1 / 2;
    color: ${colors.grana};
    border: none;
    transition: all 0.175s ease-in-out;
    :hover {
      font-size: 2.2rem;
    }
  }
`
