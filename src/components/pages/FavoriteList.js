import React, { useEffect, useState, useContext } from 'react'
// Support
import API from 'api/api'
import { RootContext } from 'components/context/RootContext'
// Components
import Loader from 'components/helpers/Loader'

export default function FavoriteList() {
  const activeAccount = useContext(RootContext)
  const [favoriteMoviesList, setFavoriteMoviesList] = useState(null)
  const [favoriteTvShowsList, setFavoriteTvShowsList] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    API.get(`/account/${activeAccount.account.id}/favorite/movies`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        session_id: activeAccount.sessionId,
      },
    })
      .then(response => {
        setFavoriteMoviesList(response.data.results)
        return API.get(
          `/account/${activeAccount.account.id}/favorite/tv`,
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY,
              session_id: activeAccount.sessionId,
            },
          },
          error => {
            console.log(error)
            setIsLoading(false)
          }
        )
      })
      .then(
        response => {
          setFavoriteTvShowsList(response.data.results)
          setIsLoading(false)
        },
        error => {
          console.log(error)
          setIsLoading(false)
        }
      )
  }, [])

  if (isLoading) {
    return (
      <Loader
        classes="text-custom-orange opacity-100"
        isSpinning={isLoading}
        size="3x"
        icon="circle-notch"
      />
    )
  } else {
    return <h1>Favorites</h1>
  }
}
