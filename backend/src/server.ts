import express, { Request, Response } from "express"
import dotenv from "dotenv"

import DBConnect from "./config/configDB/dbconn.js"
import mongoose from "mongoose"

import cors from "cors"
import corsOptions from "./config/configCors/corsOptions.js"

import productRoutes from "./routes/productRoutes.js"



dotenv.config()
const PORT = process.env.PORT || 5000
const ENV = process.env.NODE_ENV 


const app = express()
DBConnect()

app.use(cors(corsOptions))
app.use(express.json())

//Routes
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({success: true , message : "API Produits" , version :"1.0.0"})
})
app.use("/api/product" , productRoutes)

//.Routes

mongoose.connection.once("open" , () => {
    console.log("Connected to MongoDB")
    app.listen(PORT , () => {
        console.log(`Server is running on port ${PORT}`)
        console.log(ENV)
    })
})

mongoose.connection.on("error" , (err)=>{
  console.log(err)
})