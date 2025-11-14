import { toast } from "sonner"
function ForgetPassword() {
  return (
    <div className="w-full min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔐</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Reset Password
          </h2>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        <form action="#" className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="reset-email"
              className="block text-sm font-semibold text-gray-700"
            >
              📧 Email Address
            </label>
            <input
              type="email"
              id="reset-email"
              required
              placeholder="john@example.com"
              className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
              name="reset-email"
            />
          </div>

          <button
            onClick={() => toast.info("Comming Soon!")}
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
          >
            <span>📧</span>
            <span>Send Reset Link</span>
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start space-x-3">
            <span className="text-blue-600 text-sm mt-0.5">💡</span>
            <div className="text-sm text-blue-800">
              <p className="font-semibold">What happens next?</p>
              <p>
                Check your email for a password reset link. The link will expire
                in 1 hour for security.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
            >
              Back to Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
