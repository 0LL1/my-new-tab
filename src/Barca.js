import React, { Component } from 'react'
import { StyledBarca } from './styles'
import axios from 'axios'

class Barca extends Component {
  state = {
    matchCount: 0,
    competition: '',
    homeTeam: '',
    awayTeam: '',
    matchTime: ''
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://api.football-data.org/v2/teams/81/matches?status=SCHEDULED',
        {
          headers: {
            'X-Auth-Token': process.env.REACT_APP_FOOTBALLDATA_API_KEY
          }
        }
      )

      const Match = await response.data.matches[this.state.matchCount]

      this.setState({
        competition: Match.competition.name,
        homeTeam: Match.homeTeam.name,
        awayTeam: Match.awayTeam.name,
        matchTime: Match.utcDate
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  render() {
    const { homeTeam, awayTeam, matchTime, competition } = this.state

    return (
      <StyledBarca>
        <div>FC Barcelona's scheduled matches</div>
        <div>
          {homeTeam} vs {awayTeam}
        </div>
        <div>
          {competition} at {matchTime}
        </div>
      </StyledBarca>
    )
  }
}

export default Barca
