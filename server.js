const express = require('express')
const app = express()
require("dotenv").config()
const port = process.env.port
const userRouter=require('./routes/userRoute')
const productRouter=require('./routes/ProductRoute')
const orderRouter=require('./routes/OrderRoute')
const cors = require("cors");
const swaggerjsdoc=require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const corsOptions = {
   origin: '*',
   credentials: true,
   optionSuccessStatus: 200,
}

const options={
   definition:{
      openapi:"3.0.0",
      info:{
         title:"E_commerce_api",
         version:"1.0.0"
      },
      server:[
        { api:"http://localhost:3000/"}

      ]
   },
   apis:["./server.js"],
   swaggerDocument
  
}
const swagger=swaggerjsdoc(options)
app.use(cors(corsOptions))
app.use("/uploads",express.static(__dirname+"/uploads"))
app.use(express.json());


//routes
app.use('/api/order',orderRouter)
app.use('/api/product',productRouter)
app.use('/api/user',userRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
app.listen(port, (err) => err ? console.log(err) : console.log(`app listening on port ${port}`))