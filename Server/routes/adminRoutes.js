import { Router } from "express"

import {
  getComplaintList,
  getUserList,
  getDepartmentList,
  getDepartment,
  createDepartment,
  deleteDepartment,
  deleteUser,
  updateUser,
  updateDepartment,
} from "../controllers/adminControllers.js"

const router = Router()

router.get("/complaintList", getComplaintList)
router.get("/userList", getUserList)
router.get("/departmentList", getDepartmentList)
router.get("/getDepartment/:headName", getDepartment)
router.post("/createDepartment", createDepartment)
router.delete("/deleteDepartment/:id", deleteDepartment)
router.delete("/deleteUser/:id", deleteUser)
router.patch("/updateUser/:id", updateUser)
router.patch("/updateDepartment/:id", updateDepartment)

export default router
