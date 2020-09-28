import Main from 'components/pages/Main'
import FavoriteList from 'components/pages/FavoriteList'

const routes = [
  {
    icon: 'igloo',
    name: 'Home',
    path: '/home',
    component: Main,
    isDisabled: false,
    requiresSessionId: false,
  },
  {
    icon: 'video',
    name: 'Watch List (In Progress)',
    path: '/watch-list',
    component: 'WatchList',
    isDisabled: true,
    requiresSessionId: true,
  },
  {
    icon: 'layer-group',
    name: 'Collections (In Progress)',
    path: '/my-collections',
    component: 'MyCollections',
    isDisabled: true,
    requiresSessionId: true,
  },
  {
    icon: 'heart',
    name: 'Favorites',
    path: '/favorite-list',
    component: FavoriteList,
    isDisabled: false,
    requiresSessionId: true,
  },
  {
    icon: 'door-open',
    name: 'Logout',
    path: null,
    component: null,
    isDisabled: false,
    requiresSessionId: true,
  },
]

export default routes
