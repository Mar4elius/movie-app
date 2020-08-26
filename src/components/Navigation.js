import React from 'react'
// Support
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
// Data
import routes from 'assets/data/routes'

// import Main from '../components/pages/Main'

export default function Navigation() {
  return (
    <div className="w-1/6 bg-custom-grey max-h-full border-r-2 border-custom-pink">
      <nav className="fixed">
        <ul>
          {routes.map(route => {
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
          })}
        </ul>
      </nav>
    </div>
  )
}
