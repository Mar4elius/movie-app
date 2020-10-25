import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoImage from 'components/helpers/NoImage';

export default function MovieCard({ movie }) {
    const poster = () => {
        if (movie.poster_path) {
            return (
                <img
        className="rounded-lg"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
      />
            )
        } else {
            return <NoImage />
        }
    }

  return (
    <div className="mb-5 transform easy-in duration-100 hover:-translate-y-1 hover:scale-105">
      {poster()}
      <div className="p-4 border-b-2 border-custom-dark-blue">
        <h4 className="my-2">
          {movie.title ?? movie.original_name ?? 'No title'} (
          {new Date(movie.release_date).getFullYear() || 'Year Not Set'})
        </h4>

        <ul className="flex justify-between text-custom-orange ">
          <li className="flex items-center">
            <FontAwesomeIcon icon="star" />
            <p className="ml-1">{movie.vote_average}</p>
          </li>

          <li className="flex items-center">
            <FontAwesomeIcon icon="user-friends" />
            <p className="ml-1">{movie.vote_count}</p>
          </li>

          <li className="flex items-center">
            <FontAwesomeIcon icon="chart-line" />
            <p className="ml-1">{movie.popularity}</p>
          </li>
        </ul>

        <div className="my-2">
          <h6>Summary</h6>
          <p className="text-sm">{movie.overview}</p>
        </div>
      </div>
    </div>
  )
}
