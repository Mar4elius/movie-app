import React, { useState, useEffect } from 'react'

export default function Alphabet(props) {
  const [selectedLetter, setSelectedLetter] = useState(null)
  const alphabet = [
    ...new Array(10).keys(),
    ...Array.apply(null, new Array(26)).map((_, idx) =>
      String.fromCharCode(idx + 65)
    ),
  ]

  useEffect(() => {
    if (selectedLetter !== null) {
      props.handleOnClick(selectedLetter)
    }
  }, [selectedLetter])

  return (
    <div>
      <ul className="flex h-16 text-2xl justify-between">
        {alphabet.map(symbol => {
          return (
            <li
              className="m-2"
              key={symbol}
              onClick={e => setSelectedLetter(e.target.textContent)}
              className="cursor-pointer">
              {symbol}
            </li>
          )
        })}
      </ul>
      <hr className="sky-blue pt-5" />
    </div>
  )
}
