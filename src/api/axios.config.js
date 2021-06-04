import axios from 'axios'

const apis = {
  development: 'http://localhost:4000',
  production: 'https://coco-bambu.herokuapp.com'
}

// Configura axios para receber url base automaticamente, evitando repetição nas requisições.
const api = axios.create({
  baseURL: apis[process.env.NODE_ENV]
})




// Configura api para passar o token do usuário logado automaticamente no headers.
api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || `""`)

  if (userInfo.token) {
    config.headers = { Authorization: `Bearer ${userInfo.token}` }
  }

  return config
})

export default api

