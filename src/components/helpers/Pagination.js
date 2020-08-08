import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Pagination(props) {
  return (
    <div className="flex justify-end mx-5">
      <FontAwesomeIcon
        icon="chevron-left"
        className="mr-5"
        size="lg"
        onClick={() => props.handleOnClick(props.currentPage - 1)}
      />
      <FontAwesomeIcon
        icon="chevron-right"
        size="lg"
        onClick={() => props.handleOnClick(props.currentPage + 1)}
      />
    </div>
  )
}
