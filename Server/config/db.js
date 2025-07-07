import { connect } from "mongoose"

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI, {})
    console.log("connected to mongoDB")
  } catch (error) {
    console.log(error.message)
  }
}

export default connectDB
