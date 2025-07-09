import { Router } from "express"
const router = Router()
import {
  getComplaintList,
  getDepartmentList,
  getUnreadedComplaintList,
  solution,
} from "../controllers/headControllers.js"
import { getDepartment } from "../controllers/adminControllers.js"
import protect from "../middleware/authMiddleware.js"

router.get("/complaintList", getComplaintList)
router.get("/getDepartment/:headName", getDepartment)
router.get("/departmentList", getDepartmentList)
router.get("/unreadedcomplaintList", getUnreadedComplaintList)
router.put("/solution/:id", solution)

export default router
