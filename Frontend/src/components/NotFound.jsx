import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 Graphic */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-gray-300 opacity-50">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl sm:text-7xl font-bold text-blue-600 animate-bounce">
              😕
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Page Not Found
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Oops! The page you're looking for seems to have wandered off into
            the digital void.
          </p>

          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out space-x-2"
            >
              <span>🏠</span>
              <span>Go Back Home</span>
            </Link>

            {/* Additional helpful links */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link
                to="/complaint"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                📝 File a Complaint
              </Link>
              <Link
                to="/complaintList"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                📋 View Complaints
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 text-gray-400">
          <p className="text-sm">
            If you believe this is an error, please contact support
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
