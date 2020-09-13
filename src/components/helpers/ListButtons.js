import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ListButtons({ classes }) {
  return (
    <div className={classes}>
      <button>
        <span className="pr-3 text-custom-blue hover:text-custom-orange">
          <FontAwesomeIcon icon="list" size="2x" />
        </span>
      </button>
      <button>
        <span className="pr-3 text-custom-blue hover:text-custom-orange">
          <FontAwesomeIcon icon="heart" size="2x" />
        </span>
      </button>
      <button>
        <span className="text-custom-blue hover:text-custom-orange">
          <FontAwesomeIcon icon="video" size="2x" />
        </span>
      </button>
    </div>
  )
}
