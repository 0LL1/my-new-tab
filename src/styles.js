import styled, { createGlobalStyle } from 'styled-components/macro'

export const colors = {
  light: '#ffffff',
  grey: '#666666',
  background: '#111111',
  green: '#2ecc40',
  red: '#ff4136',
  yellow: '#ffdc00'
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
    user-select: none;
  }
  button:focus {
    outline: none;
  }
  .icon {
    vertical-align: middle;
  }
`

export const StyledApp = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-content: center;
`

export const StyledStopwatch = styled.div`
  width: 20rem;
  height: 20rem;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  text-align: center;
  button {
    grid-area: 3 / 1 / 4 / 2;
    font-size: 2rem;
    font-weight: normal;
    background-color: ${colors.background};
    color: ${colors.light};
    border: none;
    transition: all 0.175s ease-in-out;
    :last-child {
      grid-area: 3 / 2 / 4 / 3;
    }
    :hover {
      font-size: 2.2rem;
    }
  }
`

export const Title = styled.div`
  grid-area: 1 / 1 / 2 / 3;
  font-size: 3rem;
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
  font-size: 4rem;
`

export const Seconds = styled.div`
  grid-column: 2 / 3;
  font-size: 5rem;
`

export const Hundreths = styled.div`
  grid-column: 3 / 4;
  font-size: 4rem;
`
export const Start = styled.div`
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

export const Stop = styled.div`
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

export const Clear = styled.div`
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
