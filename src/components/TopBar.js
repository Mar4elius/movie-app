import React from 'react'
// Components
import SearchBar from './helpers/SearchBar'

export default function TopBar() {
  return (
    <div className="flex h-24 items-center text-center">
      <div className="w-1/5 bg-green-500">
        <p>Find Your Movie</p>
      </div>
      <div className="w-4/5 flex justify-around">
        <p>Mara</p>
        <SearchBar />
      </div>
    </div>
  )
}
