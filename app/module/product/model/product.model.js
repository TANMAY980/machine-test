const mongoose=require('mongoose')
const {Schema}=mongoose
const productSchema=new Schema({
    name:{type:String,required:true,default:""},
    size:{type:String,required:true,default:""}
},{timestamps:true,versionKey:false})
const productmodel=mongoose.model("product",productSchema)
module.exports=productmodel














