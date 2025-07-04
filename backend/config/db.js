import mongoose from "mongoose"

export const connectdb = async()=>{
      try{
            const conn = await mongoose.connect(process.env.MONGO_Url)
            console.log(`Mongodb connected${conn.connection.host}`);
            
      }
      catch(err){
            console.log(err);
            process.exit(1) //1 means exit with failure and 0 means success
            
      }
}