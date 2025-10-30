import fs from "fs"
import { fileURLToPath } from "url"
import path from "path"

import Complaint from "../models/complaintModel.js"
import Department from "../models/departmentModel.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const getComplaintList = async (req, res) => {
  try {
    const complaints = await Complaint.find()
    res.json(complaints)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getDepartmentList = async (req, res) => {
  try {
    const departments = await Department.find()
    res.json(departments)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const solution = async (req, res) => {
  const { id } = req.params
  const { solution } = req.body
  console.log(id, solution)
  try {
    const response = await Complaint.updateOne(
      { _id: id },
      { $set: { solution, status: "read" } }
    )
    if (response.nModified === 0) {
      return res
        .status(404)
        .json({ error: "complaint not found or no changes made" })
    }
    return res.status(200).json(response)
  } catch (error) {
    return res.status(404).json({ err: "not posting", error })
  }
}

export const getUnreadedComplaintList = async (req, res) => {
  try {
    const complaints = await Complaint.find({ status: "unread" })

    const complaintsWithFilePath = complaints.map((complaint) => {
      const complaintObj = complaint.toObject()

      if (complaint.fileUrl && typeof complaint.fileUrl === "string") {
        const filePath = path.join(__dirname, complaint.fileUrl)

        if (fs.existsSync(filePath)) {
          complaintObj.filePath = filePath
        }
      }

      return complaintObj
    })

    res.status(200).json(complaintsWithFilePath)
  } catch (error) {
    console.error("Error retrieving complaints:", error)
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message })
  }
}
