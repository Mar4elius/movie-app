import React from 'react'

export default function NavigationTabs(props) {
  const tabs = props.tabs.tabs.map(tab => {
    return (
      <button
        key={tab.name}
        className={`${
          props.activeTab === tab.name ? 'active_tab' : 'tab'
        } mr-5 text-lg`}
        onClick={() => props.handleOnClick(tab.name)}>
        {tab.name}
      </button>
    )
  })
  return (
    <React.Fragment>
      <h5 className="mr-5 font-bold">{props.tabs.title}</h5>
      {tabs}
    </React.Fragment>
  )
}
