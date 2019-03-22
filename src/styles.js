import styled, { createGlobalStyle } from 'styled-components/macro'

const colors = {
  light: '#ffffff',
  grey: '#A8ABAF',
  apps: '#282C30',
  background: '#323639',
  green: '#29CF42',
  red: '#FF564F',
  yellow: '#FFC12F'
}

//global
export const GlobalStyle = createGlobalStyle`
  html {
    background-color: ${colors.background};
    font-size: 16px;

    @media(max-width: 1080px) {
      font-size: 14px;
    }
    @media(max-width: 920px) {
      font-size: 12px;
    }
    @media(max-width: 460px) {
      font-size: 10px;
    }
    @media(max-width: 370px) {
      font-size: 8px;
    }
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
  grid-template-areas: 'MainTasks Stopwatch' 'Barca Timer';

  @media (max-width: 680px) {
    grid-template-areas: 'MainTasks' 'Barca' 'Stopwatch' 'Timer';
  }
`

//main components
const Rectangular = styled.div`
  height: 20rem;
  width: 32rem;
  margin: 1rem;
  display: grid;
  justify-items: center;
  align-items: center;
  text-align: center;
  background-color: ${colors.apps};
  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
`

export const StyledMainTasks = styled(Rectangular)`
  grid-area: MainTasks;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`

export const StyledBarca = styled(Rectangular)`
  grid-area: Barca;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`

export const BarcaFallback = styled(Rectangular)`
  grid-area: Barca;
  font-size: 2rem;
`

const Round = styled(Rectangular)`
  width: 16rem;
  height: 16rem;
  padding: 2rem;
  border-radius: 50%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`

export const StyledStopwatch = styled(Round)`
  grid-area: Stopwatch;
`

export const StyledTimer = styled(Round)`
  grid-area: Timer;
`

//smaller containers
export const StyledTime = styled.div`
  grid-area: 2 / 1 / 3 / 3;
  display: grid;
  align-items: center;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  font-weight: normal;
`

export const TaskList = styled.div`
  grid-row: 3 / 5;
  width: 30rem;
  height: 100%;
  overflow: auto;
`

export const Task = styled.div`
  font-size: 2rem;
  text-align: left;
  display: grid;
  grid-template-columns: 2rem 1fr;
  align-items: center;
  border-radius: 1rem;
  transition: all 0.175s ease-in-out;
  :hover {
    background-color: ${colors.background};
  }
  .icon {
    grid-column: 1 / 2;
    font-size: 1.5rem;
    color: ${colors.green};
    border: none;
    :hover {
      color: ${colors.red};
    }
  }
`

//title and other texts
export const Title = styled.div`
  grid-area: 1 / 1 / 2 / 3;
  font-size: 2rem;
  font-weight: lighter;
  letter-spacing: 0.5rem;
  color: ${colors.grey};
`

export const LeftTime = styled.div`
  grid-column: 1 / 2;
  font-size: 3rem;
`

export const MiddleTime = styled.div`
  grid-column: 2 / 3;
  font-size: 4rem;
`

export const RightTime = styled.div`
  grid-column: 3 / 4;
  font-size: 3rem;
`

const Primary = styled.div`
  color: ${colors.light};
  font-size: 2rem;
`

export const HomeTeam = styled(Primary)`
  grid-area: 2 / 1 / 3 / 2;
`

export const AwayTeam = styled(Primary)`
  grid-area: 2 / 2 / 3 / 3;
`

const Secondary = styled.div`
  font-size: 1.5rem;
  color: ${colors.grey};
`

export const Competition = styled(Secondary)`
  grid-area: 3 / 1 / 4 / 2;
`

export const Time = styled(Secondary)`
  grid-area: 3 / 2 / 4 / 3;
`

//buttons
const Button = styled.button`
  font-size: 2rem;
  font-weight: normal;
  background-color: ${colors.apps};
  border: none;
  border-radius: 1rem;
  text-decoration: ${props => (props.disabled ? 'line-through' : 'none')};
  transition: all 0.175s ease-in-out;
  :hover {
    background-color: ${colors.background};
  }
`

export const Start = styled(Button)`
  grid-area: 3 / 1 / 4 / 2;
  color: ${colors.green};
`

export const Stop = styled(Button)`
  grid-area: 3 / 1 / 4 / 2;
  color: ${colors.red};
`

export const Clear = styled(Button)`
  grid-area: 3 / 2 / 4 / 3;
  color: ${colors.yellow};
`

export const Next = styled(Button)`
  grid-area: 4 / 2 / 5 / 3;
  color: ${colors.green};
`

export const Prev = styled(Button)`
  grid-area: 4 / 1 / 5 / 2;
  color: ${colors.red};
`

//inputs
const Input = styled.input`
  width: 5rem;
  font-size: 3rem;
  text-align: center;
  border: none;
  background-color: ${colors.background};
  color: ${colors.light};
`

export const HoursInput = styled(Input)`
  grid-column: 1 / 2;
`

export const MinutesInput = styled(Input)`
  grid-column: 2 / 3;
`

export const SecondsInput = styled(Input)`
  grid-column: 3 / 4;
`

export const TaskInput = styled(Input)`
  grid-row: 2 / 3;
  width: 30rem;
  font-size: 2rem;
`
