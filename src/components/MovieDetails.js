import React, { useEffect, useState } from 'react'
// Support
import API from 'api/api'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Components
import Loader from 'components/helpers/Loader'
// Images
import noFace from 'assets/images/no-face.png'

export default function MovieDetails(props) {
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
    const id = movieId ?? props.movie?.id
    API.get(`/movie/${id}`, {
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
  }, [movie])

  const mediaTabComponent = _ => {
    switch (activeMediaTab) {
      case 'videos':
        return (
          <div className="w-full">
            <div className="flex overflow-x-scroll">
              {movieVideos.map(video => {
                return (
                  <div className="w-full">
                    <iframe
                      key={video.key}
                      className="m-2"
                      width="420"
                      height="315"
                      src={`https://www.youtube.com/embed/${video.key}`}></iframe>
                  </div>
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
                    className="m-2 rounded-lg h-64"
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
                  className="m-2 rounded-lg"
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
              // check if image exists
              let image = null
              if (crew?.profile_path) {
                image = (
                  <img
                    className="rounded-lg"
                    src={`https://image.tmdb.org/t/p/w500/${crew.profile_path}`}
                  />
                )
              } else {
                image = (
                  <div className="pt-12">
                    <img className="rounded-lg " src={noFace} />
                    <p className="text-center">NO IMAGE</p>
                  </div>
                )
              }
              return (
                <div className="">
                  <div className="bg-light-grey m-2 w-48">
                    {image}
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
          <div className="flex h-full">
            {movieCast.cast.map(cast => {
              // check if image exists
              let image = null
              if (cast?.profile_path) {
                image = (
                  <img
                    className="rounded-lg"
                    src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                  />
                )
              } else {
                image = (
                  <div className="pt-12">
                    <img className="rounded-lg " src={noFace} />
                    <p className="text-center">NO IMAGE</p>
                  </div>
                )
              }
              // \\ check if image exists
              return (
                <div className="min-h-full">
                  <div className="bg-light-grey m-2 w-48">
                    {image}
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
      <div className="flex flex-wrap">
        <div className="w-full flex relative overflow-hidden">
          <div className="h-screen-75">
            <img
              className="absolute left-0 top-0 w-full flex"
              src={`https://image.tmdb.org/t/p/w1280/${movieImages.backdrops[0].file_path}`}
            />
          </div>
          <div className="absolute z-10 bg-gradient-to-r from-custom-grey h-full flex justify-between w-full">
            <div className="w-1/2 p-5">
              <div className="flex flex-col space-y-5">
                <div className="flex">
                  <div className="w-full">
                    <h2>
                      {movie.title}
                      {` (${new Date(movie.release_date).getFullYear()})`}
                    </h2>
                    <h6 className="italic">{movie?.tagline ?? ''}</h6>
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
                      className="mr-3 p-2 text-center tab"
                      key={genre.name}>
                      {genre.name}
                    </button>
                  ))}
                </div>
                {/* <div className="flex">
                  {[...Array(10)].map((e, i) => (
                    <span className="pr-3" key={i}>
                      <FontAwesomeIcon icon="star" size="lg" />
                    </span>
                  ))}
                </div> */}
                <div className="my-5 h-64">
                  <h2>Story</h2>
                  <p>{movie.overview}</p>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex">
                  <button>
                    <span className="pr-3 text-custom-blue hover:text-custom-orange">
                      <FontAwesomeIcon icon="list" size="2x" />
                    </span>
                  </button>
                  <button>
                    <span className="pr-3 text-custom-blue hover:text-custom-orange">
                      <FontAwesomeIcon icon="heart" size="2x" />
                    </span>
                  </button>
                  <button>
                    <span className="text-custom-blue hover:text-custom-orange">
                      <FontAwesomeIcon icon="eye" size="2x" />
                    </span>
                  </button>
                </div>
                <div>
                  <a
                    className="pr-3 text-custom-blue hover:text-custom-orange"
                    href={movie.homepage}
                    target="_blank">
                    <FontAwesomeIcon icon="link" size="2x" />
                  </a>
                  {Object.keys(movieExternalIds).map(key => {
                    if (movieExternalIds[key] !== null) {
                      switch (key) {
                        case 'imdb_id':
                          return (
                            <a
                              className="pr-3 text-custom-blue hover:text-custom-orange"
                              href={`https://www.imdb.com/title/${movieExternalIds[key]}`}
                              target="_blank">
                              <FontAwesomeIcon
                                icon={['fab', 'imdb']}
                                size="2x"
                              />
                            </a>
                          )
                        case 'facebook_id':
                          return (
                            <a
                              className="pr-3 text-custom-blue hover:text-custom-orange"
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
                              className="pr-3 text-custom-blue hover:text-custom-orange"
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
                              className="pr-3 text-custom-blue hover:text-custom-orange"
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
            <div className="w-1/2 flex justify-end text-xl align-baseline text-custom-orange p-5">
              <FontAwesomeIcon icon="star" size="2x" />
              <span className="px-2">{movie.vote_average}</span>
              <FontAwesomeIcon icon="user-friends" size="2x" />
              <span className="pl-2">{movie.vote_count}</span>
            </div>
          </div>
        </div>
        {/* Casting  */}
        <div className="flex w-full my-5">
          <div className="w-2/5 border-r-2">
            <div className="flex items-center justify-center min-h-full">
              <div className="flex flex-col">
                <h2 className="tracking-wider">Cast</h2>

                <button
                  className={activeCastTab === 'cast' ? `active_tab` : 'tab'}
                  onClick={() => setActiveCastTab('cast')}>
                  Cast ({movieCast.cast.length})
                </button>

                <button
                  className={activeCastTab === 'crew' ? `active_tab` : 'tab'}
                  onClick={() => setActiveCastTab('crew')}>
                  Crew ({movieCast.crew.length})
                </button>
              </div>
            </div>
          </div>
          <div className="w-full overflow-x-scroll">{castTabComponent()}</div>
        </div>
        {/*  // Casting */}
        {/* Media */}
        <div className="flex w-full my-5">
          <div className="w-2/5 border-r-2">
            <div className="flex items-center justify-center min-h-full">
              <div className="flex flex-col">
                <h2 className="tracking-wider">Media</h2>
                <button
                  className={
                    activeMediaTab === 'screenshots' ? `active_tab` : 'tab'
                  }
                  onClick={() => setActiveMediaTab('screenshots')}>
                  Screenshots ({movieImages.backdrops.length})
                </button>
                <button
                  className={activeMediaTab === 'videos' ? `active_tab` : 'tab'}
                  onClick={() => setActiveMediaTab('videos')}>
                  Videos ({movieVideos.length})
                </button>
                <button
                  className={
                    activeMediaTab === 'posters' ? `active_tab` : 'tab'
                  }
                  onClick={() => setActiveMediaTab('posters')}>
                  Posters ({movieImages.posters.length})
                </button>
              </div>
            </div>
          </div>
          <div className="w-full overflow-x-scroll">{mediaTabComponent()}</div>
        </div>
        {/* // Media */}
      </div>
    )
  } else {
    return (
      <Loader
        classes="text-custom-orange opacity-100"
        isSpinning={isLoading}
        size="3x"
        icon="circle-notch"
      />
    )
  }
}
