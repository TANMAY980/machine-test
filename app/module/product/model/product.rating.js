const mongoose=require('mongoose')
const {Schema}=mongoose

const productRatingSchema=new Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,ref:"product"},
    ratedby:{type:String,required:true},
    rating:{type:Number,required:true}
},{timestamps:true,versionKey:false})
const ratingmodel=mongoose.model("ratingmodel",productRatingSchema)
module.exports=ratingmodel