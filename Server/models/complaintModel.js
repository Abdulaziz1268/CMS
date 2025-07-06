import { model } from "mongoose"

const complaintSchema = new Schema(
  {
    department: { type: String, required: true },
    severity: { type: String, required: true },
    description: { type: String, required: true },
    reporter: { type: String },
    fileUrl: { type: String },
    status: { type: String, default: "unread" },
    createdAt: { type: Date, default: Date.now },
    solution: { type: String, default: "Not solved yet" },
  },
  { timestamps: true }
)

export default model("Complaint", complaintSchema)
