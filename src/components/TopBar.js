import React, { useContext, useCallback, useState } from 'react'
import { RootContext } from './context/RootContext'
import debounce from 'lodash.debounce';
import { useHistory } from 'react-router-dom'

export default function TopBar(props) {
    const [inputValue, setInputValue] = useState('')
  let history = useHistory()
  const activeAccount = useContext(RootContext)
  const avatar = activeAccount.account?.username
    ? `https://api.adorable.io/avatars/285/${activeAccount.account?.username}@adorable.io.png`
    : `https://api.adorable.io/avatars/285/nouser@adorable.io.png`

  function setSearchTerm(e) {
    const isEnterPress = e.type === 'keypress' && e.key === 'Enter';
     if (e.type === 'focus') {
        setInputValue('');
        props.setSearch(inputValue);
    } else if (isEnterPress || e.type === 'blur') {
        setInputValue(e.target.value)
        props.setSearch(inputValue);
        history.push('/home')
    } else if (e.type === 'change') {
        setInputValue(e.targe.value)
        props.setSearch(inputValue);
    }
  }

  return (
    <div className="flex justify-around h-24 bg-custom-grey bg-opacity-50 items-center border-b-2 border-custom-blue">
      <div className="w-2/3 flex justify-end">
        <input
          type="text"
          placeholder="Enter some letters..."
          className="border-2 border-custom-blue h-12 p-2 w-64 rounded-lg"
          onBlur={setSearchTerm}
          onFocus={setSearchTerm}
          onKeyPress={setSearchTerm}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </div>
      <div className="flex justify-end w-1/2 items-center">
        <p className="mr-3">
          Hello,{' '}
          {activeAccount.account?.name ||
            activeAccount.account?.username ||
            'Guest'}
        </p>
        <img className="mr-3 rounded-full w-20" src={avatar} />
      </div>
    </div>
  )
}
