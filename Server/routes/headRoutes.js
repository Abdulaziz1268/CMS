import { Router } from "express"
const router = Router()
import {
  getComplaintList,
  getUnreadedComplaintList,
  solution,
} from "../controllers/headControllers.js"
import protect from "../middleware/authMiddleware.js"

router.get("/complaintList", protect, getComplaintList)
router.get(
  "/departmentList",
  protect,
  headControllerController.getDepartmentList
)
router.get("/unreadedcomplaintList", protect, getUnreadedComplaintList)
router.put("/solution/:id", protect, solution)

export default router
