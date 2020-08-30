import React from 'react'
// Components
import Modal from 'components/modals/Modal'
import StyledButton from 'components/helpers/StyledButton'
import StyledInput from 'components/helpers/StyledInput'

export default function WelcomeModal() {
  return (
    <Modal header="Welcome">
      <p>
        Hello. Thank you for checking this app. It's pretty cool. But in order
        to feel 100% of the functionality please register login into{' '}
        <a href="https://www.themoviedb.org">The Movie DB</a> website. Or if you
        already have an account please login to proceed.
      </p>
      <div className="w-full flex flex-col justify-center mt-4">
        <StyledInput type="email" label="Email:" id="email" />
        <StyledInput type="password" label="Password:" id="password" />
      </div>
      <div className="w-full flex justify-center mt-4">
        <StyledButton handleOnClick="" classes="inputClasses">
          Login
        </StyledButton>
      </div>
    </Modal>
  )
}
