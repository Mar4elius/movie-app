import React from 'react'

export default function TopBar(props) {
  function handleOnBlur(e) {}
  return (
    <div className="flex justify-around h-24 bg-custom-grey items-center border-b-2 border-custom-pink">
      <div className="w-2/3 flex justify-end">
        <input
          type="text"
          placeholder="Enter some letters..."
          className="border-2 border-custom-pink h-12 p-2 w-64 rounded-lg"
          onBlur={handleOnBlur}
        />
      </div>
      <div className="flex justify-end w-1/2 items-center">
        <p className="mr-3">
          Hello,{' '}
          {props.activeAccount?.name ||
            props.activeAccount?.username ||
            'Guest'}
        </p>
        <img
          className="mr-3 rounded-full"
          src={`https://secure.gravatar.com/avatar/${props.activeAccount?.avatar.gravatar.hash}.jpg?s=64`}
        />
      </div>
    </div>
  )
}
