const mongoose=require('mongoose')
const {Schema}=mongoose
const product_details_Schema=new Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,ref:"product"},
    color:[String],
    price:{type:Number,required:true}
},{timestamps:true,versionKey:false})
const productdetail=mongoose.model("productdetail",product_details_Schema)
module.exports=productdetail