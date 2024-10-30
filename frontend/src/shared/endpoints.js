const BASE = import.meta.env.VITE_HOST_API

export const endpoints = {
  auth: {
    login: `${BASE}/login`,
    logout: `${BASE}/logout`,
  },
  user: {
    profile: `${BASE}/profile`,
  },
  client: {
    search: (url) => `${BASE}${url}`,
  },
  shops: {
    shopdata: `${BASE}/shop/shopdata`,
    id: (shopId) => `${BASE}/shop/shopdata/${shopId}`,
  },
}
