import React, { useEffect, useState } from 'react'
// Support
import API from 'api/api'

export default function FavoriteList() {
  const [favoriteList, setFavoriteList] = useState(null)
  const [activeAccount, setActiveAccount] = useState()
  useEffect(() => {
    // API.get(`/account/${}/favorite/movies`)
  }, [])

  return <h1>Favorites</h1>
}
