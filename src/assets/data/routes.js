import Main from 'components/pages/Main'

const routes = [
  {
    icon: 'igloo',
    name: 'Home',
    path: '/',
    component: Main,
  },
  {
    icon: 'user',
    name: 'Profile',
    path: '/user',
    component: 'Profile',
  },
  {
    icon: 'video',
    name: 'My Video',
    path: '/my-video',
    component: 'MyVideo',
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
    path: 'favorite',
    component: 'Favorites',
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
