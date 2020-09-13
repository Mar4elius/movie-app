import Main from 'components/pages/Main'
import FavoriteList from 'components/pages/FavoriteList'

const routes = [
  {
    icon: 'igloo',
    name: 'Home',
    path: '/',
    component: Main,
    isDisabled: false,
  },
  {
    icon: 'video',
    name: 'Watch List',
    path: '/watch-list',
    component: 'WatchList',
    isDisabled: true,
  },
  {
    icon: 'layer-group',
    name: 'Collections',
    path: '/my-collections',
    component: 'MyCollections',
    isDisabled: true,
  },
  {
    icon: 'heart',
    name: 'Favorites',
    path: '/favorite-list',
    component: FavoriteList,
    isDisabled: false,
  },
  {
    icon: 'random',
    name: 'Random',
    path: '/random',
    component: 'Random',
    isDisabled: true,
  },
  {
    icon: 'door-open',
    name: 'Logout',
    path: null,
    component: null,
    isDisabled: false,
  },
]

export default routes
