import { Router } from "express"
const router = Router()
import {
  getComplaintList,
  getDepartmentList,
  createUser,
  createComplaint,
} from "../controllers/userController.js"
import protect from "../middleware/authMiddleware.js"
import upload from "../config/storage.js"

router.get("/complaintList", protect, getComplaintList)
router.get("/departmentList", protect, getDepartmentList)
router.post("/users", createUser)
router.post("/complaint", protect, upload.single("file"), createComplaint)

export default router
