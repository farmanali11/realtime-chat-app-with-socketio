import mongoose from "mongoose";

// Function to connect to MongoDB database
export const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Database Connected'));

    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (error) {
    console.log("MongoDB connection error:", error.message);
    process.exit(1);
  }
};
