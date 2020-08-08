import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Pagination(props) {
  return (
    <div className="flex justify-center">
      <FontAwesomeIcon
        icon="chevron-left"
        className="mr-5"
        size="2x"
        onClick={() => props.handleOnClick(props.currentPage - 1)}
      />
      <FontAwesomeIcon
        icon="chevron-right"
        size="2x"
        onClick={() => props.handleOnClick(props.currentPage + 1)}
      />
    </div>
  )
}
