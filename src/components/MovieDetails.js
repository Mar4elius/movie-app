import React, { useEffect, useState, useMemo, useRef } from 'react'
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
  const [movieVideos, setMovieVideos] = useState(null)
  const [movieExternalIds, setMovieExternalIds] = useState(null)
  const [movieCast, setMovieCast] = useState(null)
  const [movieReviews, setMovieReviews] = useState(null)

  const [activeMediaTab, setActiveMediaTab] = useState('screenshots')
  const [activeCastTab, setActiveCastTab] = useState('cast')

  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    API.get(`/movie/${movieId}`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        append_to_response: 'images,videos,external_ids,credits,reviews',
        include_image_language: 'en,null',
      },
    }).then(
      response => {
        const { images, videos, external_ids, credits } = response.data
        setMovie(response.data)
        setMovieImages(images)
        setMovieVideos(videos.results)
        setMovieExternalIds(external_ids)
        setMovieCast(credits)
        setIsLoading(false)
      },
      error => {
        setIsLoading(false)
        console.log(error)
      }
    )
  }, [])

  const mediaTabComponent = _ => {
    switch (activeMediaTab) {
      case 'videos':
        return (
          <div className="w-full">
            <div className="flex overflow-x-scroll">
              {movieVideos.map(video => {
                return (
                  <iframe
                    key={video.key}
                    className="m-2"
                    width="420"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.key}`}></iframe>
                )
              })}
            </div>
          </div>
        )
      case 'posters':
        return (
          <div className="w-full">
            <div className="flex overflow-x-scroll">
              {movieImages.posters.map(poster => {
                return (
                  <img
                    className="m-2"
                    src={`https://image.tmdb.org/t/p/w500/${poster.file_path}`}
                    key={poster.file_path}
                  />
                )
              })}
            </div>
          </div>
        )
      // screenshots
      default:
        return (
          <div className="flex">
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
        )
    }
  }

  const castTabComponent = () => {
    switch (activeCastTab) {
      case 'crew':
        return (
          <div className="flex">
            {movieCast.crew.map(crew => {
              return (
                <div className="">
                  <div className="bg-light-grey m-2 w-48">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${crew.profile_path}`}
                    />
                    <p className="bold">{crew.name}</p>
                    <p>{crew.job}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )
      default:
        return (
          <div className="flex">
            {movieCast.cast.map(cast => {
              return (
                <div className="">
                  <div className="bg-light-grey m-2 w-48">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                    />
                    <p className="bold">{cast.name}</p>
                    <p>{`(${cast.character})`}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )
    }
  }

  if (movie && movieImages && movieVideos && movieExternalIds && movieCast) {
    return (
      <div className="flex flex-wrap m-2">
        <div className="w-full flex bg-blue-200 rounded-lg">
          <div className="w-2/5">
            <img
              className="rounded-lg"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
          </div>
          <div className="w-full m-5">
            <div className="flex flex-col space-y-5">
              <div className="flex">
                <div className="w-1/2">
                  <h2>
                    {movie.title}
                    {` (${new Date(movie.release_date).getFullYear()})`}
                  </h2>
                </div>
                <div className="w-1/2 flex justify-end text-xl align-baseline">
                  <FontAwesomeIcon icon="star" size="2x" />
                  <span className="px-2">{movie.vote_average}</span>
                  <FontAwesomeIcon icon="user-friends" size="2x" />
                  <span className="pl-2">{movie.vote_count}</span>
                </div>
              </div>
              <ul className="flex">
                <li className="pr-3">{movie.release_date}</li>
                <li className="pr-3">{movie.runtime} min</li>
                {movie.production_countries.map(country => (
                  <li key={country.name} className="pr-3">
                    {country.name}
                  </li>
                ))}
              </ul>
              <div className="flex">
                {movie.genres.map(genre => (
                  <button
                    className="mr-3 p-2 bg-sky-blue text-center"
                    key={genre.name}>
                    {genre.name}
                  </button>
                ))}
              </div>
              <div className="flex">
                {[...Array(10)].map((e, i) => (
                  <span className="pr-3" key={i}>
                    <FontAwesomeIcon icon="star" size="lg" />
                  </span>
                ))}
              </div>
            </div>
            <div className="my-5">
              <h2>Story</h2>
              <p>{movie.overview}</p>
            </div>

            <div className="flex justify-between">
              <div className="flex">
                <button>
                  <span className="pr-3">
                    <FontAwesomeIcon icon="list" size="2x" />
                  </span>
                </button>
                <button>
                  <span className="pr-3">
                    <FontAwesomeIcon icon="heart" size="2x" />
                  </span>
                </button>
                <button>
                  <FontAwesomeIcon icon="eye" size="2x" />
                </button>
              </div>
              <div>
                <a className="pr-3" href={movie.homepage} target="_blank">
                  <FontAwesomeIcon icon="link" size="2x" />
                </a>
                {Object.keys(movieExternalIds).map(key => {
                  if (movieExternalIds[key] !== null) {
                    switch (key) {
                      case 'imdb_id':
                        return (
                          <a
                            className="pr-3"
                            href={`https://www.imdb.com/title/${movieExternalIds[key]}`}
                            target="_blank">
                            <FontAwesomeIcon icon={['fab', 'imdb']} size="2x" />
                          </a>
                        )
                      case 'facebook_id':
                        return (
                          <a
                            className="pr-3"
                            href={`https://www.facebook.com/${movieExternalIds[key]}`}
                            target="_blank">
                            <FontAwesomeIcon
                              icon={['fab', 'facebook']}
                              size="2x"
                            />
                          </a>
                        )
                      case 'instagram_id':
                        return (
                          <a
                            className="pr-3"
                            href={`https://www.instagram.com/${movieExternalIds[key]}`}
                            target="_blank">
                            <FontAwesomeIcon
                              icon={['fab', 'instagram']}
                              size="2x"
                            />
                          </a>
                        )
                      case 'twitter_id':
                        return (
                          <a
                            className="pr-3"
                            href={`https://twitter.com/${movieExternalIds[key]}`}
                            target="_blank">
                            <FontAwesomeIcon
                              icon={['fab', 'twitter']}
                              size="2x"
                            />
                          </a>
                        )
                    }
                  }
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full my-5">
          <div className="flex">
            <div className="w-2/5 border-r-2 border-sky-blue">
              <div className="text-center">
                <h2>Cast</h2>
              </div>
              <div className="flex flex-col">
                <button onClick={() => setActiveCastTab('cast')}>
                  Cast ({movieCast.cast.length})
                </button>
                <button onClick={() => setActiveCastTab('crew')}>
                  Crew: ({movieCast.crew.length})
                </button>
              </div>
            </div>
            <div className="w-full overflow-x-scroll">{castTabComponent()}</div>
          </div>
        </div>
        <div className="w-full my-5">
          <div className="flex">
            <div className="w-2/5">
              <div className="text-center">
                <h2>Media</h2>
              </div>

              <div className="flex flex-col">
                <button onClick={() => setActiveMediaTab('screenshots')}>
                  Screenshots ({movieImages.backdrops.length})
                </button>
                <button onClick={() => setActiveMediaTab('videos')}>
                  Videos ({movieVideos.length})
                </button>
                <button onClick={() => setActiveMediaTab('posters')}>
                  Posters ({movieImages.posters.length})
                </button>
              </div>
            </div>
            <div className="w-full overflow-x-scroll">
              {mediaTabComponent()}
            </div>
          </div>
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
