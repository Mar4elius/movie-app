import React, { useState, useEffect } from 'react'
// Components
import TopBar from 'components/TopBar'
import Navigation from 'components/Navigation'
import WelcomeModal from 'components/modals/WelcomeModal'
// Support
import { library } from '@fortawesome/fontawesome-svg-core'
import API from 'api/api'

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
  faDoorOpen,
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
  faEye,
  faDoorOpen
)

export default function Layout(props) {
  const [showModal, setShowModal] = useState(true)
  const [sessionId, setSessionId] = useState(
    sessionStorage.getItem('sessionId')
  )
  const [guestSessionId, setGuestSessionId] = useState(
    sessionStorage.getItem('guestSessionId')
  )
  const [activeAccount, setActiveAccount] = useState(null)

  if ((sessionId || guestSessionId) && showModal) {
    setShowModal(false)
  }

  function resetState() {
    setShowModal(true)
    setSessionId(null)
    setActiveAccount(null)
  }

  useEffect(() => {
    API.get('/account', {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        session_id: sessionId,
      },
    }).then(response => {
      setActiveAccount(response.data)
    })
  }, [sessionId])

  return (
    <div className="flex flex-wrap">
      <WelcomeModal
        showModal={showModal}
        setSessionId={setSessionId}
        setGuestSessionId={setGuestSessionId}
      />
      <div className="w-5/6">
        <TopBar activeAccount={activeAccount} />
        {props.children}
      </div>
      <div className="w-1/6">
        <Navigation
          activeAccount={activeAccount}
          sessionId={sessionId}
          onLogoutClick={resetState}
        />
      </div>
    </div>
  )
}
