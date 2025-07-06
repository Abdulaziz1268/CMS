import mongoose, { Schema, model } from "mongoose"
import { genSalt, hash } from "bcryptjs"

const userSchema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

userSchema.index({ email: 1 }, { unique: true }) // this is added so that the email becomes unique

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  const salt = await genSalt()
  this.password = await hash(this.password, salt)
  next()
})

export default model("User", userSchema)
