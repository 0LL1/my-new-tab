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
  Loader
} from './styles'

class Barca extends Component {
  state = {
    count: '',
    matches: [],
    selected: 0,
    loading: true
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    fetch(
      'https://api.football-data.org/v2/teams/81/matches?status=SCHEDULED',
      {
        headers: {
          'X-Auth-Token': process.env.REACT_APP_FOOTBALLDATA_API_KEY
        }
      }
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          count: data.count,
          matches: data.matches,
          loading: false
        })
      )
  }

  nextMatch = () => {
    if (this.state.count > this.state.selected + 1) {
      this.setState(prevState => {
        return { selected: prevState.selected + 1 }
      })
    } else return
  }

  previousMatch = () => {
    if (this.state.selected > 0) {
      this.setState(prevState => {
        return { selected: prevState.selected - 1 }
      })
    } else return
  }

  formatTime = time => {
    return moment(time).format('ddd D.M.YYYY HH:mm')
  }

  render() {
    const { matches, selected, loading } = this.state
    const match = matches[selected]

    return !loading ? (
      <StyledBarca>
        <Title>scheduled matches</Title>
        <HomeTeam>{match.homeTeam.name}</HomeTeam>
        <AwayTeam>{match.awayTeam.name}</AwayTeam>
        <Competition>{match.competition.name}</Competition>
        <Time>{this.formatTime(match.utcDate)}</Time>
        <Prev onClick={this.previousMatch}>prev</Prev>
        <Next onClick={this.nextMatch}>next</Next>
      </StyledBarca>
    ) : (
      <Loader>loading...</Loader>
    )
  }
}

export default Barca
