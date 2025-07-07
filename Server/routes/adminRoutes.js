import { Router } from "express"
const router = Router()
import {
  getComplaintList,
  getUserList,
  getDepartmentList,
  getDepHead,
  createDepartment,
  deleteDepartment,
  deleteUser,
  updateUser,
  updateDepartment,
} from "../controllers/adminControllers.js"
import protect from "../middleware/authMiddleware.js"

router.get("/complaintList", getComplaintList)
router.get("/userList", getUserList)
router.get("/departmentList", protect, getDepartmentList)
router.get("/getDepHead/:name", protect, getDepHead)
router.post("/department", protect, createDepartment)
router.delete("/deleteDepartment/:id", protect, deleteDepartment)
router.delete("/deleteUser/:id", protect, deleteUser)
router.patch("/userList/:id", protect, updateUser)
router.patch("/updateDepartment/:id", protect, updateDepartment)

export default router
