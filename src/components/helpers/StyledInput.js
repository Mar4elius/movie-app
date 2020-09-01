import React from 'react'

export default function StyledInput(props) {
  return (
    <div className="flex justify-center my-3">
      <label className="mr-5 w-20 flex justify-end" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.id}
        className="p-2 w-1/3 border-custom-orange"
        onBlur={props.handleOnBlue}
      />
    </div>
  )
}
