import React from 'react'
// Components
import Layout from 'components/Layout'
import MovieDetails from 'components/MovieDetails'
import TvShowDetails from 'components/TvShowDetails'
// Support
import { Route, Redirect } from 'react-router-dom'
// Data
import routes from './assets/data/routes'

function App() {
  return (
    <div className="flex flex-col w-full">
      <Layout>
        {/*  The <Route>‘s path is matched with the current location and a component gets rendered */}
        {routes.map(route => (
          <Route
            key={route.icon}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/movie/:id" component={MovieDetails} />
        <Route path="/tv-show/:id" component={TvShowDetails} />
      </Layout>
    </div>
  )
}

export default App
