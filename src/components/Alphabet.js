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
        {alphabet.map(letter => {
          return (
            <li className="m-2" key={letter} className="cursor-pointer">
              <span className="text-custom-dark-blue hover:text-custom-orange flex">
                <button
                  onClick={e => setSelectedLetter(e.target.textContent)}
                  className={letter === selectedLetter ? "transform hover:-translate-y-2 hover:font-bold text-custom-orange" : "transform hover:-translate-y-2 hover:font-bold" }>
                  {letter}
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
