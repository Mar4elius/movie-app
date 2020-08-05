import React from 'react'
// Components
import SearchBar from './helpers/SearchBar'
import tmdb from '../assets/images/tmdb.svg'

export default function TopBar() {
  return (
    <div className="flex h-24 items-center text-center">
      <div className="w-1/5 bg-sky-blue h-full flex justify-center">
        <p>Find Your Movie</p>
      </div>
      <div className="w-4/5 flex justify-around align-bottom">
        <p>Mara</p>
        <SearchBar />
        <img src={tmdb} alt="Tmdb logo" className="h-20 w-20" />
      </div>
    </div>
  )
}
