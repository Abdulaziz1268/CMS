import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"

import { authApi } from "./api"
import { AuthContext } from "../../Context/AuthContext"
import photo from "./google-icon.png"

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
    <div className="w-full min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back! 👋
          </h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700"
            >
              📧 Email Address
            </label>
            <input
              type="email"
              id="username"
              onChange={handleChange}
              required
              placeholder="john@example.com"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              name="email"
              value={formData.email}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              🔒 Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              id="password"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              value={formData.password}
              name="password"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="passwordVisibility"
                onChange={togglePasswordVisibility}
                name="passwordVisibility"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="passwordVisibility"
                className="text-sm text-gray-600 cursor-pointer"
              >
                {showPassword ? "🙈 Hide password" : "👁️ Show password"}
              </label>
            </div>
            <Link
              to={"/forget-password"}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full h-12 rounded-xl font-semibold text-white transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              or continue with
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            className="w-full h-12 border border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-md transition-all duration-300 ease-in-out flex items-center justify-center space-x-3 hover:scale-105 active:scale-95"
            onClick={() => toast.info("comming soon!")}
          >
            <img src={photo} alt="google icon" className="w-5 h-5" />
            <span className="font-medium text-gray-700">
              Sign in with Google
            </span>
          </button>

          <button
            className="w-full h-12 border border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-md transition-all duration-300 ease-in-out flex items-center justify-center space-x-3 hover:scale-105 active:scale-95 bg-gray-50 hover:bg-gray-100"
            onClick={handleClick}
          >
            <span className="font-medium text-gray-700">
              📝 Create a new account
            </span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
