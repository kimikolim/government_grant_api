import dotenv from "dotenv"
import { createApp } from "./app"
import mongoose from "mongoose"
const port = process.env.PORT

dotenv.config()
const MONGO_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/admin`

// process.env.PORT
// DB_PASSWORD
// DB_USERNAME
// DB_HOST

const app = createApp()

try {
  mongoose.set('returnOriginal', false)
  mongoose.connect(MONGO_URI)
  console.log('### CONNECT TO DATABASE SUCCESSFUL ###')
} catch (error) {
  console.error('mongodb connection failed: ', error)
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})