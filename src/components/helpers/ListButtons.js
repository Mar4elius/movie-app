import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTooltip from 'react-tooltip'

export default function ListButtons({ classes }) {
  return (
    <div className={classes}>
      <button
        data-tip="Add to Collection (Not Available Yet)"
        data-for="collection">
        <span className="pr-3 text-custom-blue hover:text-custom-orange">
          <FontAwesomeIcon icon="layer-group" size="2x" />
        </span>
      </button>
      <ReactTooltip id="collection" />
      <button data-tip="Add to Favorite" data-for="favorite">
        <span className="pr-3 text-custom-blue hover:text-custom-orange">
          <FontAwesomeIcon icon="heart" size="2x" />
        </span>
      </button>
      <ReactTooltip id="favorite" />
      <button
        data-tip="Add to Watchlist (Not Available Yet)"
        data-for="watchlist">
        <span className="text-custom-blue hover:text-custom-orange">
          <FontAwesomeIcon icon="video" size="2x" />
        </span>
      </button>
      <ReactTooltip id="watchlist" />
    </div>
  )
}
