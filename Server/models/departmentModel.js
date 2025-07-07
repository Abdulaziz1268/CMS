import { model, Schema } from "mongoose"

const departmentSchema = new Schema(
  {
    name: { type: String, required: true },
    head: { type: String, required: true },
    members: { type: Array, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export default model("Department", departmentSchema)
