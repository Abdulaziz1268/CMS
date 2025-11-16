import { useNavigate } from "react-router-dom"

import bg from "../images/home-bg.png"
import bgDark from "../images/home-bg.png"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative overflow-hidden">
      <img
        src={bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="absolute inset-0 bg-black/10 -z-5"></div>

      {/* Main Heading */}
      <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-gray-900 leading-tight sm:leading-snug lg:leading-relaxed mb-8 sm:mb-12 lg:mb-16 px-2">
        Welcome to{" "}
        <span className="text-blue-700 bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text">
          Complaint <br className="hidden sm:block" />
          Management System
        </span>
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 items-center justify-center w-full max-w-6xl">
        {localStorage.getItem("role") !== "admin" && (
          <button
            className="w-full sm:w-auto min-w-[200px] hover:cursor-pointer hover:bg-blue-600 active:scale-95 hover:scale-105 duration-300 ease-in-out bg-blue-700 text-white py-3 px-6 sm:py-4 sm:px-8 lg:py-5 lg:px-10 rounded-2xl border-2 border-white shadow-lg hover:shadow-xl font-semibold text-base sm:text-lg lg:text-xl transition-all"
            onClick={() => navigate("/complaint")}
          >
            📝 Report a complaint
          </button>
        )}

        <button
          className="w-full sm:w-auto min-w-[200px] hover:cursor-pointer hover:bg-blue-600 active:scale-95 hover:scale-105 duration-300 ease-in-out bg-blue-700 text-white py-3 px-6 sm:py-4 sm:px-8 lg:py-5 lg:px-10 rounded-2xl border-2 border-white shadow-lg hover:shadow-xl font-semibold text-base sm:text-lg lg:text-xl transition-all"
          onClick={() => navigate("/complaintList")}
        >
          📋 Complaint List
        </button>

        {localStorage.getItem("role") === "admin" && (
          <button
            className="w-full sm:w-auto min-w-[200px] hover:cursor-pointer hover:bg-green-600 active:scale-95 hover:scale-105 duration-300 ease-in-out bg-green-700 text-white py-3 px-6 sm:py-4 sm:px-8 lg:py-5 lg:px-10 rounded-2xl border-2 border-white shadow-lg hover:shadow-xl font-semibold text-base sm:text-lg lg:text-xl transition-all"
            onClick={() => navigate("/admin")}
          >
            ⚙️ Admin Panel
          </button>
        )}

        {localStorage.getItem("role") === "head" && (
          <button
            className="w-full sm:w-auto min-w-[200px] hover:cursor-pointer hover:bg-purple-600 active:scale-95 hover:scale-105 duration-300 ease-in-out bg-purple-700 text-white py-3 px-6 sm:py-4 sm:px-8 lg:py-5 lg:px-10 rounded-2xl border-2 border-white shadow-lg hover:shadow-xl font-semibold text-base sm:text-lg lg:text-xl transition-all"
            onClick={() => navigate("/departmentPanel")}
          >
            🏢 Department Panel
          </button>
        )}
      </div>
    </div>
  )
}

export default Home
