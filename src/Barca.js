import React, { Component } from 'react'
import moment from 'moment'
import {
  StyledBarca,
  Title,
  HomeTeam,
  AwayTeam,
  Competition,
  Time,
  Next,
  Prev,
  Fallback
} from './styles'

class Barca extends Component {
  state = {
    count: '',
    matches: [],
    index: 0,
    loading: true,
    error: false
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    fetch(
      'https://api.football-data.org/v2/teams/81/matches?status=SCHEDULED',
      {
        headers: { 'X-Auth-Token': process.env.REACT_APP_FOOTBALLDATA_API_KEY }
      }
    )
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error()
        }
      })
      .then(data =>
        this.setState({
          count: data.count,
          matches: data.matches,
          loading: false
        })
      )
      .catch(error => {
        this.setState({ error: 'Error :(' })
        console.log(error)
      })
  }

  nextMatch = () => {
    if (this.state.count > this.state.index + 1) {
      this.setState(prevState => {
        return { index: prevState.index + 1 }
      })
    } else return
  }

  previousMatch = () => {
    if (this.state.index > 0) {
      this.setState(prevState => {
        return { index: prevState.index - 1 }
      })
    } else return
  }

  formatTime = time => {
    return moment(time).format('ddd D.M.YYYY HH:mm')
  }

  render() {
    const { count, matches, index, loading, error } = this.state
    const match = matches[index]

    return !loading ? (
      <StyledBarca>
        <Title>scheduled matches</Title>
        <HomeTeam>{match.homeTeam.name}</HomeTeam>
        <AwayTeam>{match.awayTeam.name}</AwayTeam>
        <Competition>{match.competition.name}</Competition>
        <Time>{this.formatTime(match.utcDate)}</Time>
        <Prev onClick={this.previousMatch} disabled={index <= 0}>
          prev
        </Prev>
        <Next onClick={this.nextMatch} disabled={index >= count - 1}>
          next
        </Next>
      </StyledBarca>
    ) : (
      <Fallback>{!error ? 'loading...' : error}</Fallback>
    )
  }
}

export default Barca
