import { Router } from "express"

import {
  getComplaintList,
  getDepartmentList,
  getUnreadedComplaintList,
  solution,
} from "../controllers/headControllers.js"
import { getDepartment } from "../controllers/adminControllers.js"
import { authenticate, authorize } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/complaintList", authenticate, getComplaintList)
router.get(
  "/getDepartment/:headName",
  authenticate,
  authorize("head"),
  getDepartment
)
router.get("/departmentList", authenticate, getDepartmentList)
router.get(
  "/unreadedcomplaintList",
  authenticate,
  authorize("head"),
  getUnreadedComplaintList
)
router.put("/solution/:id", authenticate, authorize("head"), solution)

export default router
