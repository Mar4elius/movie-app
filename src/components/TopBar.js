import React from 'react'

export default function TopBar() {
  function handleOnBlur(e) {}

  return (
    <div className="flex justify-around h-24 bg-custom-grey items-center border-b-2 border-custom-pink">
      <input
        type="text"
        placeholder="Enter some letters..."
        className="border-2 border-custom-pink h-12 p-2 w-64 rounded-lg"
        onBlur={handleOnBlur}
      />
      <p>You are logged in as: Mara</p>
    </div>
  )
}
