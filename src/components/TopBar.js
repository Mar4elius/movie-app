import React, { useContext } from 'react'
import { RootContext } from './context/RootContext'

export default function TopBar(props) {
  const activeAccount = useContext(RootContext)

  return (
    <div className="flex justify-around h-24 bg-custom-grey bg-opacity-50 items-center border-b-2 border-custom-blue">
      <div className="w-2/3 flex justify-end">
        <input
          type="text"
          placeholder="Enter some letters..."
          className="border-2 border-custom-blue h-12 p-2 w-64 rounded-lg"
          onBlur={props.handleOnBlur}
        />
      </div>
      <div className="flex justify-end w-1/2 items-center">
        <p className="mr-3">
          Hello,{' '}
          {activeAccount.account?.name ||
            activeAccount.account?.username ||
            'Guest'}
        </p>
        <img
          className="mr-3 rounded-full"
          src={`https://secure.gravatar.com/avatar/${activeAccount.account?.avatar.gravatar.hash}.jpg?s=64`}
        />
      </div>
    </div>
  )
}
