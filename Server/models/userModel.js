import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new Schema(
  {
    fname: { type: String, required: true, trim: true },
    lname: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
)

userSchema.index({ email: 1 }, { unique: true }) // this is added so that the email becomes unique

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

export default model("User", userSchema)
