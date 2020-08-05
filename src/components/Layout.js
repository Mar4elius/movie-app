import React from 'react'
// Components
import TopBar from './TopBar'
import Navigation from './Navigation'

export default function Layout(props) {
  return (
    <div className="flex flex-col w-full">
      <TopBar />
      <div className="w-full flex">
        <Navigation />
        {props.children}
      </div>
    </div>
  )
}
