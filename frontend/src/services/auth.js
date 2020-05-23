// VERIFICA SE HÁ UM TOKEN
export const isAuthenticated = () => localStorage.getItem('token') !== null

// PEGA O TOKEN DO LOCALSTORAGE
export const getToken = () => localStorage.getItem('token')

// GUARDA O TOKEN NO LOCALSTORAGE
export const login = token => {
  localStorage.setItem('token', token)
};

// REMOVE O TOKEN NO LOCALSTORAGE
export const logout = () => {
  localStorage.removeItem('token')
};