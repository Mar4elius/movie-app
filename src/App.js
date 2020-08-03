import React from 'react'
import Layout from './components/Layout'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faVideo,
  faLayerGroup,
  faHeart,
  faRandom,
} from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faVideo, faLayerGroup, faHeart, faRandom)

function App() {
  return (
    <div className="App">
      <Layout />
    </div>
  )
}

export default App
