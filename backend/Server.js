import express from 'express'
import dotenv from 'dotenv'
import { connectdb } from './config/db.js'
import productroute from './routes/productroute.js'
import cors from "cors"; 

dotenv.config()
const port = process.env.PORT
const app = express()
app.use(cors()); 
app.use(express.json()) // allow us to accept json data in the req.body

app.use('/api/products',productroute)

app.listen(port,()=>{
      connectdb()
      console.log("server started at port 3000");
      
})


