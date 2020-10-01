import React, { useState, useEffect } from 'react'
// Components
import TopBar from 'components/TopBar'
import Navigation from 'components/Navigation'
import WelcomeModal from 'components/modals/WelcomeModal'
import RootContext from 'components/context/RootContext'
// Support
import { library } from '@fortawesome/fontawesome-svg-core'
import API from 'api/api'
import { useHistory } from 'react-router-dom'

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
  faCaretLeft,
  faCaretRight,
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
  faDoorOpen,
  faCaretLeft,
  faCaretRight
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
  const [showNavigation, setShowNavigation] = useState(false)
  const [search, setSearch] = useState(null)
  let history = useHistory()

  if ((sessionId || guestSessionId) && showModal) {
    setShowModal(false)
  }

  function resetState() {
    setShowModal(true)
    setSessionId(null)
    setActiveAccount(null)
  }

  function handleShowHideNavigation() {
    setShowNavigation(!showNavigation)
  }

  function setSearchTerm(e) {
    setSearch(e.target.value)
    history.push('/home')
  }

  useEffect(() => {
    if (sessionId) {
      API.get('/account', {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          session_id: sessionId,
        },
      }).then(response => {
        setActiveAccount(response.data)
      })
    }
  }, [sessionId])

  return (
    <div className="flex flex-wrap">
      <WelcomeModal
        showModal={showModal}
        setSessionId={setSessionId}
        setGuestSessionId={setGuestSessionId}
      />

      <RootContext
        activeAccount={activeAccount}
        sessionId={sessionId}
        searchTerm={search}>
        <div className={showNavigation ? `w-5/6` : `w-11/12`}>
          <TopBar handleOnBlur={setSearchTerm} />
          {props.children}
        </div>
        <div className={showNavigation ? `w-1/6` : 'w-1/12'}>
          <Navigation
            sessionId={sessionId}
            onLogoutClick={resetState}
            onShowHideClick={handleShowHideNavigation}
            showNavigation={showNavigation}
          />
        </div>
      </RootContext>
    </div>
  )
}
