import { Router } from "express"
const router = Router()
import {
  getComplaintList,
  getUnreadedComplaintList,
  solution,
} from "../controllers/headControllers.js"

router.get("/complaintList", getComplaintList)
router.get("/departmentList", headControllerController.getDepartmentList)
router.get("/unreadedcomplaintList", getUnreadedComplaintList)
router.put("/solution/:id", solution)

export default router
