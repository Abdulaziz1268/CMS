import { Router } from "express"

import {
  getComplaintList,
  getDepartmentList,
  getUnreadedComplaintList,
  solution,
} from "../controllers/headControllers.js"
import { getDepartment } from "../controllers/adminControllers.js"

const router = Router()

router.get("/complaintList", getComplaintList)
router.get("/getDepartment/:headName", getDepartment)
router.get("/departmentList", getDepartmentList)
router.get("/unreadedcomplaintList", getUnreadedComplaintList)
router.put("/solution/:id", solution)

export default router
