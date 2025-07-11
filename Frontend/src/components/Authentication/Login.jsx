import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"

import { authApi } from "./api"
import { AuthContext } from "../../Context/AuthContext"

function Login() {
  const { setIsLogged } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleChange = (event) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleClick = () => {
    navigate("/Register")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { data } = await authApi.post("/login", formData)
      const { token, email, fname, role } = data
      localStorage.setItem("token", token)
      localStorage.setItem("email", email)
      localStorage.setItem("fname", fname)
      localStorage.setItem("role", role)

      setIsLogged(true)

      if (role === "admin") {
        navigate("/admin")
      } else {
        navigate("/")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Login Failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="apps-container">
      <Toaster richColors expand={false} position="bottom-center" />
      <div className="login-container">
        <h2>Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">User Name</label>
          <input
            type="email"
            id="username"
            onChange={handleChange}
            required
            placeholder="john@example.com"
            className="inputs em-pas"
            name="email"
            value={formData.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            required
            placeholder="password"
            id="password"
            className="inputs em-pas"
            value={formData.password}
            name="password"
          />
          <div className="passwordVisibility">
            <input
              type="checkbox"
              id="passwordVisibility"
              onClick={togglePasswordVisibility}
              name="passwordVisibility"
            />
            <label htmlFor="passwordVisibility" className="showPasswordLabel">
              {" "}
              {showPassword ? "Hide password" : "Show password"}
            </label>
            <Link to={"/ForgetPassword"} className="forget-password">
              forget password?
            </Link>
          </div>

          <input
            type="submit"
            className="inputs btn btn1"
            name="Login"
            disabled={isLoading}
            value={isLoading ? "Processing..." : "Login"}
          />
        </form>
        <h4>
          <span>or</span>
        </h4>
        <div className="login-options">
          {/* <button className="btn button" ><img src={photo} alt="google icon" className="google-icon" /><p>Login with Gmail</p></button> */}
          <button className="btn create-account button" onClick={handleClick}>
            Create a new account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
