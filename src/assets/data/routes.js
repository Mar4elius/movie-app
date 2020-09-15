import Main from 'components/pages/Main'
import FavoriteList from 'components/pages/FavoriteList'

const routes = [
  {
    icon: 'igloo',
    name: 'Home',
    path: '/home',
    component: Main,
    isDisabled: false,
  },
  {
    icon: 'video',
    name: 'Watch List (In Progress)',
    path: '/watch-list',
    component: 'WatchList',
    isDisabled: true,
  },
  {
    icon: 'layer-group',
    name: 'Collections (In Progress)',
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
    icon: 'door-open',
    name: 'Logout',
    path: null,
    component: null,
    isDisabled: false,
  },
]

export default routes
