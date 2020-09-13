import React, { useEffect, useState, useContext } from 'react'
// Support
import API from 'api/api'
import { RootContext } from 'components/context/RootContext'
// Components
import Loader from 'components/helpers/Loader'
import MovieDetails from 'components/MovieDetails'
import TvShowDetails from 'components/TvShowDetails'
import NavigationTabs from 'components/helpers/NavigationTabs'
import ListButtons from 'components/helpers/ListButtons'
// Data
import { FavoriteListTabs } from 'assets/data/tabs'

export default function FavoriteList() {
  const activeAccount = useContext(RootContext)
  const [favoriteMoviesList, setFavoriteMoviesList] = useState(null)
  const [favoriteTvShowsList, setFavoriteTvShowsList] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedShow, setSelectedShow] = useState(null)
  const [activeTab, setActiveTab] = useState('Movies')
  const [showList, setShowList] = useState(favoriteMoviesList)

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
        setShowList(response.data.results)
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

  const showDetails = () => {
    // Only tv shows have first_air_date
    if (selectedShow?.first_air_date) {
      return <TvShowDetails tvShow={selectedShow} />
    } else if (selectedShow?.id) {
      return <MovieDetails movie={selectedShow} />
    } else {
      return (
        <div className="w-full text-center">
          <p>Select the movie or TV show to see details.</p>
        </div>
      )
    }
  }

  function handleOnTabClick(value) {
    setActiveTab(value)
    setShowList(value === 'Movies' ? favoriteMoviesList : favoriteTvShowsList)
    setSelectedShow(null)
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
      <div className="w-full h-full mt-3">
        <div className="flex items-center justify-center mb-3">
          <NavigationTabs
            tabs={FavoriteListTabs}
            activeTab={activeTab}
            handleOnClick={handleOnTabClick}
          />
        </div>

        <div className="flex overflow-x-scroll">
          {showList.map(movie => {
            let classes = null
            if (selectedShow?.id !== movie.id) {
              classes =
                'w-48 transform easy-in duration-100 hover:-translate-y-1 hover:scale-110'
            } else {
              classes = 'w-64 transform easy-in-out duration-100'
            }

            return (
              <div className="m-3" key={movie.id}>
                <div className={`${classes}`}>
                  <img
                    className="rounded-lg"
                    onClick={() => setSelectedShow(movie)}
                    src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
                  />
                  <p className="text-center mt-2">
                    {movie.title ?? movie.original_name}
                  </p>
                  <ListButtons classes={`flex justify-evenly mt-2`} />
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10">{showDetails()}</div>
      </div>
    )
  }
}
