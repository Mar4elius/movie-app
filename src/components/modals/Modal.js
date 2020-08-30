import React from 'react'

export default function Modal({ header, children }) {
  return (
    <div className="fixed top-0 left-0 bg-gray-900 z-10 bg-opacity-75 w-full h-full flex justify-center items-center">
      <div className="w-1/2 rounded-lg bg-custom-white opacity-100">
        <div class="w-full m-2 text-center">
          <h2>{header}</h2>
        </div>
        <div className="m-4">{children}</div>
      </div>
    </div>
  )
}
