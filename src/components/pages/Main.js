import React, { useState, useEffect, useContext } from 'react'
// Support
import API from 'api/api'
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'
// Helper Components
import Alphabet from 'components/Alphabet'
import Errors from 'components/helpers/Errors'
import MovieCard from 'components/helpers/MovieCard'
import Loader from 'components/helpers/Loader'
import Pagination from 'components/helpers/Pagination'
import { RootContext } from 'components/context/RootContext'

export default function Main() {
  const [searchTerm, setSearchTerm] = useState(useContext(RootContext).searchTerm)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [trendStatus, setTrendStatus] = useState('week')
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  useEffect(() => {
    if (trendStatus) {
      searchTrending()
    }
  }, [currentPage, trendStatus])

  useEffect(() => {
    if (searchTerm?.length) {
        setTrendStatus(null)
      searchMovies(searchTerm)
    }
  }, [currentPage, searchTerm])

  function searchTrending() {
    setIsLoading(true)
    const url =
      trendStatus === 'week' ? `/trending/all/week` : '/trending/all/day'
    API.get(url, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        page: currentPage,
      },
    }).then(
      response => {
        setMovies(response.data.results)
        setIsLoading(false)
        setCurrentPage(response.data.page)
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      error => {
        setIsLoading(false)
        setError(error)
      }
    )
  }

  function handleTrendClick(value) {
    setSearchTerm('');
    setCurrentPage(1)
    setTrendStatus(value)
  }

  function handleAlphabetOnClick(value) {
      setSearchTerm(value)
  }

  function searchMovies(value) {
    setIsLoading(true)
    API.get(`/search/multi`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        page: currentPage,
        query: encodeURI(value),
      },
    }).then(
      response => {
        //TODO: come back to this later so to make it sort correctly
        const moviesSortedByName = response.data.results.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        })
        setMovies(moviesSortedByName)
        setIsLoading(false)
        setCurrentPage(response.data.page)
      },
      error => {
        setIsLoading(false)
        setError(error)
      }
    )
  }

  return (
    <div className="w-full">
      <Alphabet handleOnClick={handleAlphabetOnClick} />

      <Errors
        showErrors={error?.response?.data?.success}
        error={error?.response?.data}
      />
      <div className="w-full flex items-center justify-between align-top mb-6 flex-1">
        <div />
        <div className="flex">
          <h5 className="mr-5 font-bold">Trending:</h5>
          <button
            className={`${
              trendStatus === `week` ? 'active_tab' : 'tab'
            } mr-5 text-lg`}
            onClick={() => handleTrendClick('week')}>
            This Week
          </button>
          <button
            className={`${
              trendStatus === `day` ? 'active_tab' : 'tab'
            } text-lg`}
            onClick={() => handleTrendClick('day')}>
            Today
          </button>
        </div>
        <div className="flex justify-end">
          <Pagination
            handleOnClick={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>

      <Loader
        classes="text-custom-orange opacity-100"
        isSpinning={isLoading}
        size="3x"
        icon="circle-notch"
      />

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto m-2"
        columnClassName="m-2">
        {movies.map(movie => {
          if (movie?.first_air_date) {
            return (
              <div key={movie.id}>
                <Link to={`/tv-show/${movie.id}`}>
                  <MovieCard movie={movie} key={movie.id} />
                </Link>
              </div>
            )
          } else {
            return (
              <div key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <MovieCard movie={movie} key={movie.id} />
                </Link>
              </div>
            )
          }
        })}
      </Masonry>

      <Pagination handleOnClick={setCurrentPage} currentPage={currentPage} />
    </div>
  )
}
