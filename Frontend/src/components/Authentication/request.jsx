import axios from "axios"

const api = axios.create({
  // baseURL: "https://cms-hwdq.onrender.com"
  baseURL: "http://localhost:2005/api",
})

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token")
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export default api
