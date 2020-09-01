import React from 'react'

export default function Button(props) {
  return (
    <button
      type="button"
      onClick={props.handleOnClick}
      className="p-2 mx-3 bg-custom-pink w-40 rounded-lg hover:bg-custom-orange">
      {props.children}
    </button>
  )
}
