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
    search: (searchTerm) => `${BASE}/search?keyword=${searchTerm}`,
  },
}
