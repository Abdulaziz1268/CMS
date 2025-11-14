import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

import User from "../models/userModel.js"

const jwtSecret = process.env.JWT_SECRET

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    //check if user exists
    if (!user) return res.status(400).json({ message: "The user does't exist" })

    //compare the password
    const isMatch = await bcrypt.compare(password, user.password)

    //check if password matches
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" })

    // generate jwt
    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
      expiresIn: "7d",
    })
    res.json({ token, email, fname: user.fname, role: user.role })
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
}

export const register = async (req, res) => {
  try {
    const user = new User(req.body)
    const savedUser = await user.save()
    const userWithoutPass = savedUser.toObject()
    delete userWithoutPass.password

    return res.status(201).json({
      message: "Registration successful",
      user: userWithoutPass,
    })
  } catch (error) {
    // Duplicate email (MongoDB code 11000)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists",
      })
    }

    // Validation errors (Mongoose)
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({
        message: "Validation failed",
        errors,
      })
    }

    // Other unknown errors
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    })
  }
}
