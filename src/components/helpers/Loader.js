import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Loader(props) {
  if (!props.isSpinning) {
    return null
  }

  return (
    <div className="w-full h-full z-10 fixed left-0 top-0 flex justify-center items-center opacity-75 bg-black">
      <FontAwesomeIcon
        icon={props.icon}
        spin={props.isSpinning}
        size={props.size}
        className={props.classes}
      />
    </div>
  )
}
