import React, { useState, useEffect } from 'react'
// Support
import axios from 'axios'
import { Link, Route } from 'react-router-dom'
import Masonry from 'react-masonry-css'
// Helper Components
import Alphabet from '../Alphabet'
import Errors from '../helpers/Errors'
import MovieCard from '../helpers/MovieCard'
import Loader from '../helpers/Loader'
import Pagination from '../helpers/Pagination'
import MovieDetails from '../MovieDetails'

export default function Main() {
  // State variables
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  // TODO: must be moved to some data file so to make it easier to update in future
  const mtdbLink = 'https://api.themoviedb.org/3'
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar
  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${mtdbLink}/trending/all/week`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          page: currentPage,
        },
      })
      .then(
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
  }, [currentPage])

  function searchMovies(value) {
    setIsLoading(true)
    setCurrentPage(1)
    axios
      .get(`${mtdbLink}/search/multi`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          page: currentPage,
          query: encodeURI(value),
        },
      })
      .then(
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
    <div>
      <Alphabet handleOnClick={searchMovies} />

      <Errors
        showErrors={error?.response?.data?.success}
        error={error?.response?.data}
      />

      <Pagination handleOnClick={setCurrentPage} currentPage={currentPage} />

      <Loader
        classes="text-sky-blue opacity-100"
        isSpinning={isLoading}
        size="3x"
        icon="circle-notch"
      />

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto m-2"
        columnClassName="m-2">
        {movies.map(movie => {
          return (
            <div key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <MovieCard movie={movie} key={movie.id} />
              </Link>
              {/* <Route path={`/movie/${movie.id}`} component={MovieDetails} /> */}
            </div>
          )
        })}
      </Masonry>

      <Pagination handleOnClick={setCurrentPage} currentPage={currentPage} />
    </div>
  )
}
