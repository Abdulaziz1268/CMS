import { Router } from "express"
const router = Router()
import {
  getComplaintList,
  getDepartmentList,
  createComplaint,
} from "../controllers/userController.js"
import protect from "../middleware/authMiddleware.js"
import upload from "../config/storage.js"

router.get("/complaintList", getComplaintList)
router.get("/departmentList", getDepartmentList)
router.post("/createComplaint", upload.single("file"), createComplaint)

export default router
