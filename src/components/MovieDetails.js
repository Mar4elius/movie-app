import React, { useEffect, useState } from 'react'
// Support
import API from 'api/api'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Components
import Loader from 'components/helpers/Loader'

export default function MovieDetails() {
  const { id: movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [movieImages, setMovieImages] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    API.get(`/movie/${movieId}`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
      },
    }).then(
      response => {
        setMovie(response.data)
        setIsLoading(false)
      },
      error => {
        setIsLoading(false)
        console.log(error)
      }
    )
  }, [])

  useEffect(() => {
    setIsLoading(true)
    API.get(`/movie/${movieId}/images`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
      },
    }).then(
      response => {
        setMovieImages(response.data)
        setIsLoading(false)
      },
      error => {
        setIsLoading(false)
        console.log(error)
      }
    )
  }, [])

  if (movie && movieImages) {
    return (
      <div className="flex justify-around">
        <div className="flex flex-wrap">
          <div className="flex h-16 justify-between mt-5">
            {[...Array(10)].map((e, i) => (
              <FontAwesomeIcon icon="star" size="lg" key={i} />
            ))}
            <p>Rate this movie</p>
          </div>
          <div className="w-full flex h-16">
            <p>
              <span className="text-2xl">{movie.vote_average}</span>/10
            </p>
            <p>Ratings</p>
            <p>{movie.vote_count}</p>
            <p>Reviewers</p>
          </div>
          <div>
            <h2>Stroy Line</h2>
            <p>{movie.overview}</p>
          </div>
          <div className="w-full">
            <h2>Screenshots</h2>
            <div className="flex flex-row overflow-x-scroll">
              {movieImages.backdrops.map(image => {
                return (
                  <img
                    className="m-2"
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    key={image.file_path}
                  />
                )
              })}
            </div>
          </div>
          <div className="w-full">
            <h2>Videos</h2>
          </div>
        </div>
        <div className="w-1/5 m-4">
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <p>{movie.title}</p>
          <h1>Category</h1>
          {/*TODO: Add onclick event for getting movies in specific genre */}
          <ul>
            {movie.genres.map(genre => (
              <li>{genre.name}</li>
            ))}
          </ul>
          <p>Release Date : {movie.release_date}</p>
          {/* TODO: get hours */}
          <p>Length: {movie.runtime}</p>
          <ul className="flex">
            {movie.production_countries.map(country => (
              <li>{country.name}</li>
            ))}
          </ul>
          <ul>
            <li>share icon</li>
            <li>favorite icon</li>
            <li>Bookmarks</li>
          </ul>
        </div>
      </div>
    )
  } else {
    return (
      <Loader
        classes="text-sky-blue opacity-100"
        isSpinning={isLoading}
        size="3x"
        icon="circle-notch"
      />
    )
  }
}
