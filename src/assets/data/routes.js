import Main from 'components/pages/Main'
import FavoriteList from 'components/pages/FavoriteList'

const routes = [
  {
    icon: 'igloo',
    name: 'Home',
    path: '/',
    component: Main,
  },
  {
    icon: 'video',
    name: 'Watch List',
    path: '/watch-list',
    component: 'WatchList',
  },
  {
    icon: 'layer-group',
    name: 'Collections',
    path: '/my-collections',
    component: 'MyCollections',
  },
  {
    icon: 'heart',
    name: 'Favorites',
    path: '/favorite-list',
    component: FavoriteList,
  },
  {
    icon: 'random',
    name: 'Random',
    path: '/random',
    component: 'Random',
  },
  {
    icon: 'door-open',
    name: 'Logout',
    path: null,
    component: null,
  },
]

export default routes
