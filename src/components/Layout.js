import React from 'react'
// Components
import TopBar from 'components/TopBar'
import Navigation from 'components/Navigation'
// Support
import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faUser,
  faVideo,
  faLayerGroup,
  faHeart,
  faRandom,
  faStar,
  faUserFriends,
  faChartLine,
  faCircleNotch,
  faChevronLeft,
  faChevronRight,
  faIgloo,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser,
  faVideo,
  faLayerGroup,
  faHeart,
  faRandom,
  faStar,
  faUserFriends,
  faChartLine,
  faCircleNotch,
  faChevronLeft,
  faChevronRight,
  faIgloo
)

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
