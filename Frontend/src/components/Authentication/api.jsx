import axios from "axios"

const localURL = "http://localhost:2005"
const cloudURL = "https://cms-hwdq.onrender.com"

export const userApi = axios.create({
  baseURL: `${localURL}/api/user/`,
})

export const adminApi = axios.create({
  baseURL: `${localURL}/api/admin/`,
})

export const headApi = axios.create({
  baseURL: `${localURL}/api/head/`,
})

// api.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token")
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`
//   }
//   return req
// })
