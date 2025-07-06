import { Router } from "express"
const router = Router()
import {
  getComplaintList,
  getDepartmentList,
  createUser,
  createComplaint,
} from "../controllers/userController.js"

router.get("/complaintList", getComplaintList)
router.get("/departmentList", getDepartmentList)
router.post("/users", createUser)
router.post("/complaint", upload.single("file"), createComplaint)

export default router
