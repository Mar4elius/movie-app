import React from 'react'
// Support
import API from 'api/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
// Data
import routes from 'assets/data/routes'
// Image
import tmdb from 'assets/images/tmdb.svg'

export default function Navigation(props) {
  function logout() {
    API.delete('/authentication/session', {
      params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY,
        session_id: props.sessionId,
      },
    }).then(response => {
      sessionStorage.clear()
      props.onLogoutClick()
    })
  }

  return (
    <div className="min-h-full bg-custom-grey border-l-2 border-custom-pink">
      <div className="fixed">
        <div className="w-full flex justify-center items-center">
          <a href="https://www.themoviedb.org" target="_blank">
            <img src={tmdb} alt="Tmdb logo" className="h-20 w-20" />
          </a>
        </div>
        <nav>
          <ul>
            {routes.map(route => {
              if (route.name !== 'Logout') {
                return (
                  <li className="m-5 cursor-pointer " key={route.icon}>
                    {/* <Link/> is the element you could use to navigate through routes. */}
                    <Link to={route.path}>
                      <div className="flex justify-start">
                        <span className="w-16 text-custom-pink hover:text-custom-orange flex justify-center">
                          <FontAwesomeIcon icon={route.icon} size="2x" />
                        </span>
                        <div className="tracking-widest mx-5 text-custom-pink">
                          <p>{route.name}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              } else if (props.activeAccount?.id) {
                return (
                  <li
                    className="m-5 cursor-pointer "
                    key={route.icon}
                    onClick={logout}>
                    <div className="flex justify-start">
                      <span className="w-16 text-custom-pink hover:text-custom-orange flex justify-center">
                        <FontAwesomeIcon icon={route.icon} size="2x" />
                      </span>
                      <div className="tracking-widest mx-5 text-custom-pink">
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
