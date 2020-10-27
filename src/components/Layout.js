import React, { useState, useEffect } from 'react'
// Components
import TopBar from 'components/TopBar'
import Navigation from 'components/Navigation'
import WelcomeModal from 'components/modals/WelcomeModal'
import RootContext from 'components/context/RootContext'
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
  faCaretLeft,
  faCaretRight,
  faImage
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
  faCaretRight,
  faImage
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
  const [search, setSearch] = useState('')

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

  useEffect(() => {
    // to handle Warning: Can't perform a React state update on an unmounted component. error
    let isMounted = true
    if (sessionId && !activeAccount) {
      API.get('/account', {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
          session_id: sessionId,
        },
    }).then(response => {
        if (isMounted) {
          setActiveAccount(response.data)
        }
      })
    }
    // clean up function
    return () => (isMounted = false)
  }, [activeAccount, sessionId])

  const PropsChild = () => {
      if ((activeAccount && sessionId) || guestSessionId) {
          return props.children;
      } else {
          return null;
      }
  }

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
          <TopBar
            setSearch={setSearch} />
          <PropsChild />
        </div>
        <div className={showNavigation ? `w-1/6` : 'w-1/12'}>
          <Navigation
            onLogoutClick={resetState}
            onShowHideClick={handleShowHideNavigation}
            showNavigation={showNavigation}
          />
        </div>
      </RootContext>
    </div>
  )
}
