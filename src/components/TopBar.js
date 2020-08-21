import React from 'react'
// Image
import tmdb from 'assets/images/tmdb.svg'

export default function TopBar() {
  function handleOnBlur(e) {}

  return (
    <div className="flex h-24 bg-custom-orange items-center border-b-2 border-custom-blue">
      <div className="w-1/6 h-full flex justify-center items-center border-r-2 border-custom-blue">
        <a href="https://www.themoviedb.org" target="_blank">
          <img src={tmdb} alt="Tmdb logo" className="h-20 w-20" />
        </a>
      </div>
      <div className="w-5/6 flex justify-around items-center">
        <input
          type="text"
          placeholder="Enter some letters..."
          className="border-2 border-custom-blue h-12 p-2 w-64 rounded-lg"
          onBlur={handleOnBlur}
        />
        <p>You are logged in as: Mara</p>
      </div>
    </div>
  )
}
