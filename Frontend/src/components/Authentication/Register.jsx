import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { authApi } from "./api"

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState({})
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const navigate = useNavigate()

  // Validation schema
  const schema = Yup.object().shape({
    fname: Yup.string().required("Name is required"),
    lname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })

  const handleChange = (event) => {
    setUserData((prevUser) => {
      return {
        ...prevUser,
        [event.target.name]: event.target.value,
      }
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError({})

    try {
      await schema.validate(userData, { abortEarly: false })

      const { confirmPassword, ...data } = userData
      console.log(data)

      const response = await authApi.post("/register", data)

      toast.success(response.message)
      navigate("/login")
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {}

        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message
          }
        })

        setError(newErrors)

        toast.error("Please fix the highlighted errors.")
        return
      }

      if (err.response) {
        toast.error(err.response.data?.message || "Registration failed")
        return
      }

      // Unknown error
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account 🎉
          </h2>
          <p className="text-gray-600">
            Join us and start managing complaints efficiently
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="fname"
                className="block text-sm font-semibold text-gray-700"
              >
                👤 First Name
              </label>
              <input
                type="text"
                id="fname"
                className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                minLength={3}
                required
                name="fname"
                onChange={handleChange}
                placeholder="John"
              />
              {error.fname && (
                <p className="text-red-500 text-sm">{error.fname}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lname"
                className="block text-sm font-semibold text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                minLength={2}
                required
                name="lname"
                onChange={handleChange}
                placeholder="Doe"
              />
              {error.lname && (
                <p className="text-red-500 text-sm">{error.lname}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              📧 Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="john@example.com"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              name="email"
              onChange={handleChange}
            />
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}
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
              required
              placeholder="Create a strong password"
              id="password"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              name="password"
              onChange={handleChange}
            />
            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-semibold text-gray-700"
            >
              ✅ Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              required
              placeholder="Confirm your password"
              onChange={handleChange}
              name="confirmPassword"
            />
            {error.confirmPassword && (
              <p className="text-red-500 text-sm">{error.confirmPassword}</p>
            )}
          </div>

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
              {showPassword ? "🙈 Hide passwords" : "👁️ Show passwords"}
            </label>
          </div>

          {/* <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Password Requirements:
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• Include uppercase and lowercase letters</li>
              <li>• Include numbers and special characters</li>
            </ul>
          </div> */}

          <button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
          >
            <span>🚀</span>
            <span>Create Account</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
