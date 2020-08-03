import React from 'react'
// Components
import TopBar from './TopBar'
import Navigation from './Navigation'

export default function Layout() {
  return (
    <div className="flex flex-col w-full h-screen">
      <TopBar />
      <Navigation />
    </div>
  )
}
