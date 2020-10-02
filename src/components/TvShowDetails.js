import React, { useEffect, useState } from 'react'
// Support
import API from 'api/api'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Components
import Loader from 'components/helpers/Loader'
import ReactTooltip from 'react-tooltip'
// Images
import noFace from 'assets/images/no-face.png'

export default function MovieDetails(props) {
  const { id: tvShowId } = useParams()

  const [tvShow, setTvShow] = useState(null)
  const [tvShowImages, setTvShowImages] = useState(null)
  const [tvShowVideos, setTvShowVideos] = useState(null)
  const [tvShowExternalIds, setTvShowExternalIds] = useState(null)
  const [tvShowCast, setTvShowCast] = useState(null)

  const [activeMediaTab, setActiveMediaTab] = useState('screenshots')
  const [activeCastTab, setActiveCastTab] = useState('cast')

  const [isLoading, setIsLoading] = useState(false)

  const hoverText = 'Not available yet'

  useEffect(() => {
    setIsLoading(true)
    const id = tvShowId ?? props.tvShow?.id
    API.get(`/tv/${id}`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        append_to_response: 'images,videos,external_ids,credits,reviews',
        include_image_language: 'en,null',
      },
    }).then(
      response => {
        const { images, videos, external_ids, credits } = response.data
        setTvShow(response.data)
        setTvShowImages(images)
        setTvShowVideos(videos.results)
        setTvShowExternalIds(external_ids)
        setTvShowCast(credits)
        setIsLoading(false)
      },
      error => {
        setIsLoading(false)
      }
    )
  }, [tvShowId, props.tvShow])

  const mediaTabComponent = _ => {
    switch (activeMediaTab) {
      case 'videos':
        return (
          <div className="w-full">
            <div className="flex overflow-x-scroll">
              {tvShowVideos.map(video => {
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
              {tvShowImages.posters.map(poster => {
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
            {tvShowImages.backdrops.map(image => {
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
            {tvShowCast.crew.map(crew => {
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
                <div className="" key={crew.id}>
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
            {tvShowCast.cast.map(cast => {
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
                <div className="min-h-full" key={cast.id}>
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

  if (
    tvShow &&
    tvShowImages &&
    tvShowVideos &&
    tvShowExternalIds &&
    tvShowCast
  ) {
    return (
      <div className="flex flex-wrap">
        <div className="w-full flex relative overflow-hidden">
          <div className="h-screen-75">
            <img
              className="absolute left-0 top-0 w-full flex"
              src={`https://image.tmdb.org/t/p/w1280/${tvShowImages.backdrops[0].file_path}`}
            />
          </div>
          <div className="absolute z-10 bg-gradient-to-r from-custom-grey h-full flex justify-between w-full">
            <div className="w-1/2 p-5">
              <div className="flex flex-col space-y-5">
                <div className="flex">
                  <div className="w-full">
                    <h2>
                      {tvShow.name}
                      {` (${new Date(
                        tvShow.first_air_date
                      ).getFullYear()} - ${new Date(
                        tvShow.last_air_date
                      ).getFullYear()})`}
                    </h2>
                  </div>
                </div>

                <ul className="flex">
                  <li className="pr-3">{tvShow.first_air_date}</li>
                  <li className="pr-3">
                    {`${tvShow.episode_run_time} min. per episode`}{' '}
                  </li>
                  {tvShow.origin_country.map(country => (
                    <li key={country.name} className="pr-3">
                      {country.name}
                    </li>
                  ))}
                </ul>

                <ul className="flex">
                  <li className="pr-3">{`Seasons count: ${tvShow.number_of_seasons}`}</li>
                  <li className="pr-3">{`Episodes count: ${tvShow.number_of_episodes}`}</li>
                </ul>

                <div className="flex">
                  {tvShow.genres.map(genre => (
                    <button
                      className="mr-3 p-2 text-center tab"
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
                <div className="my-5 h-64">
                  <h2>Story</h2>
                  <p>{tvShow.overview}</p>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex">
                  <ReactTooltip id="list" place="top" />
                  <button data-for="list" data-tip={hoverText}>
                    <span className="pr-3 text-custom-blue hover:text-custom-orange">
                      <FontAwesomeIcon icon="list" size="2x" />
                    </span>
                  </button>
                  <ReactTooltip id="favorite" place="top" />
                  <button data-for="favorite" data-tip={hoverText}>
                    <span className="pr-3 text-custom-blue hover:text-custom-orange">
                      <FontAwesomeIcon icon="heart" size="2x" />
                    </span>
                  </button>
                  <ReactTooltip id="watchlist" place="top" />
                  <button data-for="watchlist" data-tip={hoverText}>
                    <span className="text-custom-blue hover:text-custom-orange">
                      <FontAwesomeIcon icon="eye" size="2x" />
                    </span>
                  </button>
                </div>
                <div>
                  <a
                    className="pr-3 text-custom-blue hover:text-custom-orange"
                    href={tvShow.homepage}
                    target="_blank">
                    <FontAwesomeIcon icon="link" size="2x" />
                  </a>
                  {Object.keys(tvShowExternalIds).map(key => {
                    if (tvShowExternalIds[key] !== null) {
                      switch (key) {
                        case 'imdb_id':
                          return (
                            <a
                              key={key}
                              className="pr-3 text-custom-blue hover:text-custom-orange"
                              href={`https://www.imdb.com/title/${tvShowExternalIds[key]}`}
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
                              key={key}
                              className="pr-3 text-custom-blue hover:text-custom-orange"
                              href={`https://www.facebook.com/${tvShowExternalIds[key]}`}
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
                              key={key}
                              className="pr-3 text-custom-blue hover:text-custom-orange"
                              href={`https://www.instagram.com/${tvShowExternalIds[key]}`}
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
                              key={key}
                              className="pr-3 text-custom-blue hover:text-custom-orange"
                              href={`https://twitter.com/${tvShowExternalIds[key]}`}
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
              <span className="px-2">{tvShow.vote_average}</span>
              <FontAwesomeIcon icon="user-friends" size="2x" />
              <span className="pl-2">{tvShow.vote_count}</span>
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
                  Cast ({tvShowCast.cast.length})
                </button>

                <button
                  className={activeCastTab === 'crew' ? `active_tab` : 'tab'}
                  onClick={() => setActiveCastTab('crew')}>
                  Crew ({tvShowCast.crew.length})
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
                  Screenshots ({tvShowImages.backdrops.length})
                </button>
                <button
                  className={activeMediaTab === 'videos' ? `active_tab` : 'tab'}
                  onClick={() => setActiveMediaTab('videos')}>
                  Videos ({tvShowVideos.length})
                </button>
                <button
                  className={
                    activeMediaTab === 'posters' ? `active_tab` : 'tab'
                  }
                  onClick={() => setActiveMediaTab('posters')}>
                  Posters ({tvShowImages.posters.length})
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
