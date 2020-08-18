import React from 'react'
// Components
import Layout from 'components/Layout'
import MovieDetails from 'components/MovieDetails'
// Support
import { Route } from 'react-router-dom'
// Data
import routes from './assets/data/routes'

function App() {
  return (
    <div className="flex flex-col w-full">
      <Layout>
        {/*  The <Route>‘s path is matched with the current location and a component gets rendered */}
        <div className="w-5/6">
          {routes.map(route => (
            <Route
              key={route.icon}
              exact
              path={route.path}
              component={route.component}
            />
          ))}
          <Route path="/movie/:id" component={MovieDetails} />
        </div>
      </Layout>
    </div>
  )
}

export default App
