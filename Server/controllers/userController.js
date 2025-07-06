import Complaint from "../models/complaintModel.js"
import Department from "../models/departmentModel.js"

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

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body)
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ error: "Email already exists" })
    } else {
      res.status(400).json(error)
    }
  }
}

export const createComplaint = async (req, res) => {
  const { department, severity, description, reporter } = req.body
  const fileUrl = req.file ? req.file.path : null
  try {
    const newComplaint = new Complaint({
      department,
      severity,
      description,
      fileUrl,
      reporter,
    })
    const savedComplaint = await newComplaint.save()
    res.status(201).json(savedComplaint)
  } catch (error) {
    res.status(400).json(error)
  }
}
