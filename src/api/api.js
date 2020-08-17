import axios from 'axios'

// const API = axios.create({
//   baseUrl: 'https://api.themoviedb.org/3',
//   headers: { Accept: 'application/json' },
//   responseType: 'json',
// })
const API = axios.create()
API.defaults.baseURL = 'https://api.themoviedb.org/3'

export default API
