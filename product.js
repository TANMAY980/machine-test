const express=require('express')
const dotenv=require('dotenv')
const bodyParser=require('body-parser')
const Db=require('./app/config/db.config')
dotenv.config()
const app=express()
Db.DbConnection()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const productrouter=require('./routes/product.routes')
app.use('/api',productrouter)

PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`application running on http://localhost:${PORT}`);
})