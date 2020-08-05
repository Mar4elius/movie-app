import React from 'react'
import Layout from './components/Layout'
import { library } from '@fortawesome/fontawesome-svg-core'
import Main from './components/pages/Main'
import {
  faUser,
  faVideo,
  faLayerGroup,
  faHeart,
  faRandom,
  faStar,
  faUserFriends,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser,
  faVideo,
  faLayerGroup,
  faHeart,
  faRandom,
  faStar,
  faUserFriends,
  faChartLine
)

function App() {
  return (
    <div className="App">
      <Layout>
        <Main></Main>
      </Layout>
    </div>
  )
}

export default App
