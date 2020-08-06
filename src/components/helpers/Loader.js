import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Loader(props) {
  if (!props.isSpinning) {
    return null
  }

  return (
    <div className="w-full text-center">
      <FontAwesomeIcon
        icon={props.icon}
        spin={props.isSpinning}
        size={props.size}
        className={props.classes}
      />
    </div>
  )
}
