import axios from "axios"

const cloud = false
const url = cloud ? "https://cms-hwdq.onrender.com" : "http://localhost:2005"

export const userApi = axios.create({
  baseURL: `${url}/api/user/`,
})

export const adminApi = axios.create({
  baseURL: `${url}/api/admin/`,
})

export const headApi = axios.create({
  baseURL: `${url}/api/head/`,
})

export const authApi = axios.create({
  baseURL: `${url}/api/auth/`,
})

const authInterceptor = (req) => {
  const token = localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
}

adminApi.interceptors.request.use(authInterceptor)
headApi.interceptors.request.use(authInterceptor)
userApi.interceptors.request.use(authInterceptor)
