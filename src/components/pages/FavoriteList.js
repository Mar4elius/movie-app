import React, { useEffect, useState, useContext } from 'react'
// Support
import API from 'api/api'
import { RootContext } from 'components/context/RootContext'

export default function FavoriteList() {
  const [favoriteMoviesList, setFavoriteMoviesList] = useState(null)
  const [favoriteTvShowsList, setFavoriteTvShowsList] = useState(null)
  const activeAccount = useContext(RootContext)
  useEffect(() => {
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
          }
        )
      })
      .then(
        response => {
          setFavoriteTvShowsList(response.data.results)
        },
        error => {
          console.log(error)
        }
      )
  }, [])

  return <h1>Favorites</h1>
}
