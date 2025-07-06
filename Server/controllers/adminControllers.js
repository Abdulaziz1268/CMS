import Complaint from "../models/complaintModel.js"
import User from "../models/userModel.js"
import Department from "../models/departmentModel.js"

export const getComplaintList = async (req, res) => {
  try {
    const complaints = await Complaint.find()
    res.json(complaints)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getUserList = async (req, res) => {
  try {
    const users = await User.find()
    console.log(users)
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json(error)
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

export const getDepHead = async (req, res) => {
  const { name } = req.params
  try {
    const depHead = await Department.find({ head: name })
    res.status(200).json(depHead)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const createDepartment = async (req, res) => {
  try {
    const newDepartment = new Department(req.body)
    const savedDepartment = await newDepartment.save()
    res.status(201).json(savedDepartment)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const deleteDepartment = async (req, res) => {
  const { id } = req.params
  try {
    const deleteDep = await Department.deleteOne({ _id: id })
    res.status(200).json(deleteDep)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const deleteUser = await User.deleteOne({ _id: id })
    res.status(200).json(deleteUser)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  try {
    const updateUser = await User.updateOne({ _id: id }, { $set: updateData })
    if (updateUser.nModified === 0) {
      res.status(404).json({ error: "User not found or no changes made" })
    }
    res.status(200).json(updateUser)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const updateDepartment = async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  try {
    const updateDep = await Department.updateOne(
      { _id: id },
      { $set: updateData }
    )
    if (updateDep.nModified === 0) {
      res.status(404).json({ error: "Department not found or no changes made" })
    }
    res.status(200).json(updateDep)
  } catch (error) {
    res.status(404).json(error)
  }
}
