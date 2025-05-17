import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from "./lib/db.js";
import cors from 'cors'

import path from 'path'

import userRoutes from "./routes/user.js"
import bookStore from "./routes/book.js"
import favouriteBook from "./routes/favourite.js"
import cartBook from "./routes/cart.routes.js"
import orderBook from "./routes/order.routes.js"



const app= express()

// for deployment
const _dirname=path.resolve();

dotenv.config();
app.use(express.json())
app.use(cookieParser());  // ✅ Add this to parse cookies
app.use(cors({
    origin:["https://book-store-fullstack-mithun.onrender.com"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))


app.use("/api/auth",userRoutes)
app.use("/api/book",bookStore)
app.use("/api/favourite",favouriteBook)
app.use("/api/cart",cartBook)
app.use("/api/order",orderBook)

// for deployment
app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})

app.listen(process.env.PORT,()=>{
    console.log("Server started at port",process.env.PORT);
    connectDB()
})