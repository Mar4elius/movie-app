import React from 'react'

export default function Errors(props) {
  // success is false - show error
  if (props.showErrors === false) {
    return (
      <div className="bg-red-300 p-8 text-center">
        <p>Uh oh! Something went wrong.</p>
        <p>Error code is: {props.error?.status_code}</p>
      </div>
    )
  }

  return null
}
