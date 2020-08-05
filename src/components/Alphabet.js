import React from 'react'

export default function Alphabet() {
  const alphabet = [
    ...new Array(10).keys(),
    ...Array.apply(null, new Array(26)).map((_, idx) =>
      String.fromCharCode(idx + 65)
    ),
  ]

  return (
    <div>
      <ul className="flex h-16 text-2xl justify-between">
        {alphabet.map(symbol => {
          return (
            <li className="m-2" key={symbol}>
              {symbol}
            </li>
          )
        })}
      </ul>
      <hr className="sky-blue p-5" />
    </div>
  )
}
