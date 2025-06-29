import mongoose from "mongoose"

// Function to connect the mongodb database

export const connectDB= async () =>{
    try {

        mongoose.connection.on('conneted',()=>console.log('Database Connected'))
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)

    }catch (error){
        console.log(error)

    }
}