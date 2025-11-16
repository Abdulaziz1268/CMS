import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import Notifications from "./Notifications"
import DepComplaints from "./depComplaints"
import homeWhite from "../../images/home-white.png"
import homeDark from "../../images/home-dark.png"
import sun from "../../images/light-mode.png"
import moon from "../../images/dark-mode.png"
import { headApi } from "../Authentication/api"

const DepartmentPanel = () => {
  const [darkTheme, setDarkTheme] = useState(false)
  const [refresher, setRefersher] = useState(true)
  const [department, setDepartment] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    headApi
      .get(`/getDepartment/${localStorage.getItem("fname")}`)
      .then((response) => {
        setDepartment(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [refresher])

  function handleRefresher() {
    setRefersher((prevState) => !prevState)
  }

  function toggleTheme() {
    setDarkTheme((prevTheme) => !prevTheme)
    document.body.classList.toggle("light-theme")
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex flex-col">
      <div className="flex-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center p-6 bg-white dark:bg-gray-800 shadow-sm">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <img
              className="w-6 h-6"
              src={!darkTheme ? homeDark : homeWhite}
              alt="Home"
            />
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              📥 New Complaints
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Recent complaints requiring attention
            </p>
          </div>

          <button
            // onClick={toggleTheme}
            onClick={() => toast.info("Comming soon!")}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <img
              className="w-6 h-6"
              src={darkTheme ? sun : moon}
              alt="Toggle Theme"
            />
          </button>
        </div>

        <div className="p-6">
          <Notifications
            handleRefresher={handleRefresher}
            refresher={refresher}
            department={department}
          />
        </div>
      </div>

      <div className="flex-1 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              📚 Old Complaints
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Previously handled complaints
            </p>
          </div>

          <DepComplaints refresher={refresher} department={department} />
        </div>
      </div>
    </div>
  )
}

export default DepartmentPanel
