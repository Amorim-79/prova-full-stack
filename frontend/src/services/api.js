import axios from 'axios'

import { getToken } from './auth'

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

// VERIFICA SE HÁ UM TOKEN NO LOCALSTORAGE E O ADICIONA AO HEADER
api.interceptors.request.use(async config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

export default api