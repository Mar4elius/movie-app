import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Navigation() {
  const icons = [
    {
      icon: 'user',
      name: 'Profile',
    },
    { icon: 'video', name: 'My Video' },
    { icon: 'layer-group', name: 'Collection' },
    {
      icon: 'heart',
      name: 'Favorites',
    },
    { icon: 'random', name: 'Random' },
  ]
  return (
    <div className="w-1/5 bg-gray-200 h-screen">
      <ul>
        {icons.map(icon => {
          return (
            <li
              className="m-5 flex align-baseline justify-center cursor-pointer"
              key={icon.icon}>
              <div className="flex justify-start">
                <FontAwesomeIcon icon={icon.icon} size="2x" />
              </div>
              <div className="flex justify-center">
                <p className="tracking-widest mx-5">{icon.name}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
