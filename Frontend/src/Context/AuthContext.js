import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    token ? setIsLogged(true) : setIsLogged(false)
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("fname")
    localStorage.removeItem("role")
    setIsLogged(false)
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
