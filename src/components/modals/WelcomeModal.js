import React, { useEffect } from 'react'
// Components
import Modal from 'components/modals/Modal'
import StyledButton from 'components/helpers/StyledButton'

// Support
import API from 'api/api'

export default function WelcomeModal(props) {
  const currentURL = window.location.href

  async function getAuthenticationToken() {
    await API.get('/authentication/token/new', {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
      },
    }).then(response => {
      window.location.replace(
        `https://www.themoviedb.org/authenticate/${response.data.request_token}?redirect_to=${currentURL}/home`
      )
    })
  }

  async function loginAsGuest() {
    await API.get('/authentication/guest_session/new', {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
      },
    }).then(response => {
      sessionStorage.setItem('guestSessionId', response.data.guest_session_id)
      props.setGuestSessionId(response.data.guest_session_id)
    })
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    if (queryParams.has('approved') && queryParams.get('approved') === 'true') {
      const bodyData = {
        request_token: queryParams.get('request_token'),
      }
      API.post('/authentication/session/new', bodyData, {
        params: {
          api_key: process.env.REACT_APP_TMDB_API_KEY,
        },
      }).then(response => {
        sessionStorage.setItem('sessionId', response.data.session_id)
        props.setSessionId(response.data.session_id)
      })
    }
  }, [])

  return (
    <Modal header="Welcome" showModal={props.showModal}>
      <p>
        Hello. Thank you for checking this app. It's pretty cool. But in order
        to have 100% of the functionality please register login into
        <a href="https://www.themoviedb.org">The Movie DB</a> website. Or if you
        already have an account please login to proceed.
      </p>
      <div className="w-full flex justify-center mt-4">
        <StyledButton
          handleOnClick={getAuthenticationToken}
          classes="inputClasses">
          Login
        </StyledButton>
        <StyledButton handleOnClick={loginAsGuest} classes="inputClasses">
          Proceed as Guest
        </StyledButton>
      </div>
    </Modal>
  )
}
