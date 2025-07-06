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

router.get("/complaintList", getComplaintList)
router.get("/userList", getUserList)
router.get("/departmentList", getDepartmentList)
router.get("/getDepHead/:name", getDepHead)
router.post("/department", createDepartment)
router.delete("/deleteDepartment/:id", deleteDepartment)
router.delete("/deleteUser/:id", deleteUser)
router.patch("/userList/:id", updateUser)
router.patch("/updateDepartment/:id", updateDepartment)

export default router
