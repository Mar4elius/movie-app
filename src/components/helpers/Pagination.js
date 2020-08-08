import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Pagination(props) {
  let backArrow = null
  if (props.currentPage > 1) {
    backArrow = (
      <FontAwesomeIcon
        icon="chevron-left"
        className="mr-5 cursor-pointer"
        size="lg"
        onClick={() => props.handleOnClick(props.currentPage - 1)}
      />
    )
  }

  return (
    <div className="flex justify-end mx-5">
      {backArrow}
      <FontAwesomeIcon
        icon="chevron-right"
        className="cursor-pointer"
        size="lg"
        onClick={() => props.handleOnClick(props.currentPage + 1)}
      />
    </div>
  )
}
