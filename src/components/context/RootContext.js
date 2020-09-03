import React from 'react'

export const RootContext = React.createContext()

export default props => {
  if (props?.activeAccount) {
    return (
      <RootContext.Provider value={props.activeAccount}>
        {props.children}
      </RootContext.Provider>
    )
  } else {
    return null
  }
}
