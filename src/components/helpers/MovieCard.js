import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MovieCard({ movie }) {
  return (
    <div className="mb-10 bg-regular-grey border-2">
      {/* 
              <p>{movie.release_date}</p> */}
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
      <div className="p-4">
        <h4 className="text-sky-blue my-2">
          {movie.title ?? movie.original_name ?? 'No title'}
        </h4>

        <ul className="flex justify-between text-pink-500">
          <li>
            <FontAwesomeIcon icon="star" />
            {movie.vote_average}
          </li>

          <li>
            <FontAwesomeIcon icon="user-friends" />
            {movie.vote_count}
          </li>

          <li>
            <FontAwesomeIcon icon="chart-line" />
            {movie.popularity}
          </li>
        </ul>

        <div>
          <h6>Summary</h6>
          <p className="text-sm">{movie.overview}</p>
        </div>
      </div>
    </div>
  )
}
