import Notifications from "./Notifications"
import DepComplaints from "./depComplaints"

const DepartmentPanel = () => {
  return (
    <div className="department-pannel-container">
      <div className="new-complaints">
        <h2>New Complaints</h2>
        <Notifications />
      </div>
      <div className="old-complaints">
        <h2>Old Complaints</h2>
        <DepComplaints />
      </div>
    </div>
  )
}

export default DepartmentPanel
