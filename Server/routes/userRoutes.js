import { Router } from "express"

import {
  getComplaintList,
  getDepartmentList,
  createComplaint,
} from "../controllers/userController.js"
import upload from "../config/storage.js"
import { authenticate } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/complaintList", authenticate, getComplaintList)
router.get("/departmentList", authenticate, getDepartmentList)
router.post(
  "/createComplaint",
  authenticate,
  upload.single("file"),
  createComplaint
)

export default router
