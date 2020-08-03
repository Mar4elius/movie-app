import React from 'react'
// Components
import TopBar from './TopBar'
import Navigation from './Navigation'

export default function Layout() {
  return (
    <div className="w-full">
      <TopBar />
      <Navigation />
    </div>
  )
}
