import multer, { diskStorage } from "multer"
import { extname } from "path"

const storage = diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    return cb(null, Date.now() + extname(file.originalname))
  },
})

export default multer({ storage })
