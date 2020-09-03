import React from 'react'

export const RootContext = React.createContext()

export default props => {
  const defaultContext = {
    account: props.activeAccount,
    sessionId: props.sessionId,
  }
  if (props?.activeAccount) {
    return (
      <RootContext.Provider value={defaultContext}>
        {props.children}
      </RootContext.Provider>
    )
  } else {
    return null
  }
}
