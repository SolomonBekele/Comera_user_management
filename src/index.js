import express from 'express'
import dotenv from 'dotenv';
import userRoute from "./routes/userRoutes.js";
import authRoute from "./routes/authRoutes.js";
import bookRoute from "./routes/bookRoutes.js";
import borrowRoute from "./routes/borrowRoutes.js"
import i18n from './i18n/langConfig.js';
import argon2 from 'argon2'

// console.log( argon2.hash("password123").then((data)=>console.log(data)));

dotenv.config();

const app = express()

app.use(express.json())
app.use((req,res,next)=>{
    //  argon2.hash("password123").then(data=>console.log(data))
    console.log(req.url);
    next()
})

app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.use('/api/book',bookRoute)
app.use('/api/borrow',borrowRoute)
i18n.setLocale("en")
app.use((req, res, next) => {
    res.status(404).json({ message: i18n.__("PAGE_NOT_FOUND") });
});

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

