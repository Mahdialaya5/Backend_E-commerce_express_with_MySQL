const express = require('express')
const app = express()
require("dotenv").config()
const port = process.env.port
const userRouter=require('./routes/userRoute')
const productRouter=require('./routes/ProductRoute')
const orderRouter=require('./routes/OrderRoute')
const cors = require("cors");

const corsOptions = {
   origin: '*',
   credentials: true,
   optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use("/uploads",express.static(__dirname+"/uploads"))
app.use(express.json());


//routes
app.use('/api/order',orderRouter)
app.use('/api/product',productRouter)
app.use('/api/user',userRouter)

app.listen(port, (err) => err ? console.log(err) : console.log(`app listening on port ${port}`))