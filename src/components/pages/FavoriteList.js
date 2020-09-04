import React, { useEffect, useState, useContext } from 'react'
// Support
import API from 'api/api'
import { RootContext } from 'components/context/RootContext'
// Components
import Loader from 'components/helpers/Loader'
import MovieDetails from 'components/MovieDetails'

export default function FavoriteList() {
  const activeAccount = useContext(RootContext)
  const [favoriteMoviesList, setFavoriteMoviesList] = useState(null)
  const [favoriteTvShowsList, setFavoriteTvShowsList] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMovie, setSelectedMovie] = useState(null)
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

  const movieDetails = () => {
    if (selectedMovie?.id) {
      return <MovieDetails movie={selectedMovie} />
    } else {
      return null
    }
  }

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
    return (
      <div className="w-full">
        <div className="flex overflow-x-scroll">
          {favoriteMoviesList.map(movie => {
            return (
              //   <div className="m-5 cursor-pointer">
              <img
                className="rounded-lg m-5 h-64"
                onClick={() => setSelectedMovie(movie)}
                src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                key={movie.id}
              />
              // <p className="text-center mt-2">{movie.title}</p>
              //   </div>
            )
          })}
        </div>
        {/* <div className="w-full flex justify-center">{movieDetails()}</div> */}
      </div>
    )
  }
}
