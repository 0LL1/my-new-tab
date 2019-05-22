import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import {
  StyledBarca,
  Title,
  HomeTeam,
  AwayTeam,
  Competition,
  Time,
  Next,
  Prev,
  BarcaFallback
} from './styles'

const Barca = () => {
  const [matches, setMatches] = useState([])
  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          'https://api.football-data.org/v2/teams/64/matches?status=SCHEDULED',
          {
            headers: {
              'X-Auth-Token': process.env.REACT_APP_FOOTBALLDATA_API_KEY
            }
          }
        )
        const data = await response.json()

        if (data.matches.length <= 0) {
          throw new Error('no scheduled matches')
        }

        setMatches(data.matches)
        setIsLoading(false)
      } catch (error) {
        if (error.message === 'no scheduled matches') {
          setErrorMessage('no scheduled matches :(')
        } else {
          setErrorMessage('error :(')
          console.log(error)
        }
      }
    }
    getData()
  }, [errorMessage])

  const nextMatch = () => {
    if (matches.length > index + 1) {
      setIndex(prevState => prevState + 1)
    } else return
  }

  const previousMatch = () => {
    if (index > 0) {
      setIndex(prevState => prevState - 1)
    } else return
  }

  const formatTime = time => {
    return dayjs(time).format('ddd D.M.YYYY HH:mm')
  }

  const match = matches[index]

  return !isLoading ? (
    <StyledBarca>
      <Title>scheduled matches</Title>
      <HomeTeam>{match.homeTeam.name}</HomeTeam>
      <AwayTeam>{match.awayTeam.name}</AwayTeam>
      <Competition>{match.competition.name}</Competition>
      <Time>{formatTime(match.utcDate)}</Time>
      <Prev onClick={previousMatch} disabled={index <= 0}>
        prev
      </Prev>
      <Next onClick={nextMatch} disabled={index >= matches.length - 1}>
        next
      </Next>
    </StyledBarca>
  ) : (
    <BarcaFallback>{!errorMessage ? 'loading...' : errorMessage}</BarcaFallback>
  )
}

export default Barca
