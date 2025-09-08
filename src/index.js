import express from 'express'
import dotenv from 'dotenv';
import userRoute from "./routes/userRoutes.js";
import authRoute from "./routes/authRoutes.js";


dotenv.config();

const app = express()

app.use(express.json())

app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

