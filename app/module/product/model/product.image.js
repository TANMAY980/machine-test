const mongoose=require('mongoose')
const {Schema}=mongoose
const productImageSchema=new Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,ref:"product"},
    image:{type:String,required:true}
},{timestamps:true,versionKey:false})
const productImagemodel=mongoose.model("productImagemodel",productImageSchema)
module.exports=productImagemodel