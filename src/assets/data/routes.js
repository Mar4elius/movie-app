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
    tooltipText: '',
  },
  {
    icon: 'video',
    name: 'Watch List (In Progress)',
    path: '/watch-list',
    component: 'WatchList',
    isDisabled: true,
    requiresSessionId: true,
    tooltipText: 'Not Available for Guest',
  },
  {
    icon: 'layer-group',
    name: 'Collections (In Progress)',
    path: '/my-collections',
    component: 'MyCollections',
    isDisabled: true,
    requiresSessionId: true,
    tooltipText: 'Not Available for Guest',
  },
  {
    icon: 'heart',
    name: 'Favorites',
    path: '/favorite-list',
    component: FavoriteList,
    isDisabled: false,
    requiresSessionId: true,
    tooltipText: 'Not Available for Guest',
  },
  {
    icon: 'door-open',
    name: 'Logout',
    path: null,
    component: null,
    isDisabled: false,
    requiresSessionId: true,
    tooltipText: '',
  },
]

export default routes
