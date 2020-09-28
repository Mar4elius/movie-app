import React, { useContext } from 'react'
// Support
import API from 'api/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
// Data
import routes from 'assets/data/routes'
// Image
import tmdb from 'assets/images/tmdb.svg'
import { RootContext } from './context/RootContext'

export default function Navigation(props) {
  const activeAccount = useContext(RootContext)

  function logout() {
    API.delete('/authentication/session', {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        session_id: activeAccount.sessionId,
      },
    }).then(response => {
      sessionStorage.clear()
      props.onLogoutClick()
      window.location.replace('/')
    })
  }

  return (
    <div className="min-h-full border-l-2 border-custom-blue">
      <div className="fixed">
        <div className="w-full flex justify-center items-center">
          <a href="https://www.themoviedb.org" target="_blank">
            <img src={tmdb} alt="Tmdb logo" className="h-20 w-20" />
          </a>
        </div>
        <nav>
          <ul>
            <li className="m-5 cursor-pointer">
              <div className="flex justify-start">
                <span
                  className="w-full text-custom-blue hover:text-custom-orange flex justify-center"
                  onClick={props.onShowHideClick}>
                  <FontAwesomeIcon icon="caret-right" size="3x" />
                </span>
              </div>
            </li>
            {routes.map(route => {
              if (route.name !== 'Logout') {
                return (
                  <li className="m-5 text-custom-blue" key={route.icon}>
                    {/* <Link/> is the element you could use to navigate through routes. */}
                    <NavLink
                      to={route.path}
                      className={
                        route.isDisabled ||
                        (route.requiresSessionId && !activeAccount.sessionId)
                          ? 'disabled-link'
                          : 'cursor-pointer'
                      }
                      activeClassName="text-custom-orange">
                      <div className="flex justify-start hover:text-custom-orange">
                        <div className="flex justify-center">
                          <FontAwesomeIcon icon={route.icon} size="2x" />
                        </div>
                        <div className="tracking-widest mx-5">
                          <p>{route.name}</p>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                )
              } else if (activeAccount.account?.id) {
                return (
                  <li
                    className="m-5 cursor-pointer "
                    key={route.icon}
                    onClick={logout}>
                    <div className="flex justify-start text-custom-blue hover:text-custom-orange">
                      <div className="flex justify-center">
                        <FontAwesomeIcon icon={route.icon} size="2x" />
                      </div>
                      <div className="tracking-widest mx-5">
                        <p>{route.name}</p>
                      </div>
                    </div>
                  </li>
                )
              }
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
