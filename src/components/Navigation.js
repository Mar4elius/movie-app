import React from 'react'
// Support
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
// Data
import routes from 'assets/data/routes'

// import Main from '../components/pages/Main'

export default function Navigation() {
  return (
    <div className="w-1/6 bg-gray-200 max-h-full">
      <nav>
        <ul>
          {routes.map(route => {
            return (
              <li className="m-5 cursor-pointer" key={route.icon}>
                {/* <Link/> is the element you could use to navigate through routes. */}
                <Link to={route.path}>
                  <div className="flex justify-start">
                    <div className="w-16">
                      <FontAwesomeIcon icon={route.icon} size="2x" />
                    </div>
                    <div>
                      <p className="tracking-widest mx-5">{route.name}</p>
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
