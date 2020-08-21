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
    <div className="m-2">
      <ul className="flex text-2xl justify-between">
        {alphabet.map(symbol => {
          return (
            <li className="m-2" key={symbol} className="cursor-pointer">
              <span className="text-custom-blue hover:text-custom-orange flex">
                <button
                  onClick={e => setSelectedLetter(e.target.textContent)}
                  className=" transform hover:-translate-y-2 hover:font-bold">
                  {symbol}
                </button>
              </span>
            </li>
          )
        })}
      </ul>
      <hr className="my-5" />
    </div>
  )
}
