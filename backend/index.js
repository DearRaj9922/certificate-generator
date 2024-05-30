const express=require('express')
const app=express();
const env=require('dotenv');
const cors=require('cors');
const pdfRoute=require('./pdfRoutes');
const path = require('path')
env.config()



app.use(express.json())
app.use(cors())

app.use(pdfRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
})