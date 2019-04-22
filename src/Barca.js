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
  const [count, setCount] = useState(0)
  const [matches, setMatches] = useState([])
  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      fetch(
        'https://api.football-data.org/v2/teams/81/matches?status=SCHEDULED',
        {
          headers: {
            'X-Auth-Token': process.env.REACT_APP_FOOTBALLDATA_API_KEY
          }
        }
      )
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error()
          }
        })
        .then(data => {
          setCount(data.count)
          setMatches(data.matches)
          setIsLoading(false)
        })
        .catch(error => {
          setHasError(true)
          console.log(error)
        })
    }
    getData()
  }, [])

  const nextMatch = () => {
    if (count > index + 1) {
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
      <Next onClick={nextMatch} disabled={index >= count - 1}>
        next
      </Next>
    </StyledBarca>
  ) : (
    <BarcaFallback>{!hasError ? 'loading...' : 'error :('}</BarcaFallback>
  )
}

export default Barca
