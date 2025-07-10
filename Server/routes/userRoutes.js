import { Router } from "express"

import {
  getComplaintList,
  getDepartmentList,
  createComplaint,
} from "../controllers/userController.js"
import upload from "../config/storage.js"

const router = Router()

router.get("/complaintList", getComplaintList)
router.get("/departmentList", getDepartmentList)
router.post("/createComplaint", upload.single("file"), createComplaint)

export default router
