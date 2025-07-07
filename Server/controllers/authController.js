import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import User from "../models/userModel.js"

const jwtSecret = process.env.JWT_SECRET

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    //check if user exists
    if (!user) return res.status(400).json({ message: "The user does't exist" })

    //compare the password
    const isMatch = await compare(password, user.password)

    //check if password matches
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" })

    // generate jwt
    const token = sign({ id: user._id }, jwtSecret, { expiresIn: "1h" })
    res.json({ token, email, fname: user.fname, role: user.role })
  } catch (error) {
    res.status(500).json(error)
  }
}
