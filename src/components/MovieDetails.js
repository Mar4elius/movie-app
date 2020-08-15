import React, { useEffect } from 'react'
// Support
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function MovieDetails(props) {
  const mtdbLink = 'https://api.themoviedb.org/3'
  const { id: movieId } = useParams()
  useEffect(() => {
    axios
      .get(`${mtdbLink}/movie/${movieId}`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
        },
      })
      .then(
        response => {
          console.log(response)
        },
        error => {
          console.log(error)
        }
      )
  }, [])
  return (
    <div className="w-4/5">
      <h1>Hello</h1>
    </div>
  )
}
