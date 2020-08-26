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
  faLink,
  faList,
  faEye,
} from '@fortawesome/free-solid-svg-icons'

import {
  faFacebook,
  faImdb,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'

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
  faIgloo,
  faFacebook,
  faImdb,
  faInstagram,
  faTwitter,
  faLink,
  faList,
  faEye
)

export default function Layout(props) {
  return (
    <div className="flex flex-wrap">
      <div className="w-5/6">
        <TopBar />
        {props.children}
      </div>
      <div className="w-1/6">
        <Navigation />
      </div>
    </div>
  )
}
