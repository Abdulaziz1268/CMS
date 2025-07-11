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
import { authenticate, authorize } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/complaintList", authenticate, getComplaintList)
router.get("/userList", authenticate, authorize("admin"), getUserList)
router.get("/departmentList", authenticate, getDepartmentList)
router.get(
  "/getDepartment/:headName",
  authenticate,
  authorize("admin"),
  getDepartment
)
router.post(
  "/createDepartment",
  authenticate,
  authorize("admin"),
  createDepartment
)
router.delete(
  "/deleteDepartment/:id",
  authenticate,
  authorize("admin"),
  deleteDepartment
)
router.delete("/deleteUser/:id", authenticate, authorize("admin"), deleteUser)
router.patch("/updateUser/:id", authenticate, authorize("admin"), updateUser)
router.patch(
  "/updateDepartment/:id",
  authenticate,
  authorize("admin"),
  updateDepartment
)

export default router
