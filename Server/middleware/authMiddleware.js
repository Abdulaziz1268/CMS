// import jwt from "jsonwebtoken"

// export const authenticate = async (req, res, next) => {
//   const token = await req.headers.authorization?.split(" ")[1]
//   if (!token) {
//     return res.status(401).json({ message: "No token, unauthorized" })
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     req.user = decoded

//     next()
//   } catch (error) {
//     console.log("error authenticating", error.message)
//     return res.status(401).json({ message: "Invalid or expired token" })
//   }
// }

// export const authorize = async (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Access denied" })
//     }

//     next()
//   }
// }

import jwt from "jsonwebtoken"

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: "No token, unauthorized" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    console.log("Error authenticating:", error.message)
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" })
    }
    next()
  }
}
