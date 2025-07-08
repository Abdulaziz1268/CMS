import jwt from "jsonwebtoken"

const protect = async (req, res, next) => {
  try {
    const token = await req.header("Authorization").split(" ")[1]
    if (!token) {
      return res.status(401).json({ message: "No token, unauthorized" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (error) {
    console.log("error authenticating", error.message)
  }
}

export default protect
