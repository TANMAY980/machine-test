const mongoose=require('mongoose')

class Db{
    async DbConnection(req,res){
        try {
            const connection=await mongoose.connect(process.env.MONGO_URL)
            if(connection){
                console.log("Database connected with the application successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports=new Db()