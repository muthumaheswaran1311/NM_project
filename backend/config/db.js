import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect("mongodb+srv://Muthumaheswaranm:64Y5eYuYnciWk1el@cluster0.xgnfoay.mongodb.net/quizzy");
    console.log("Database Connected Successfully");
}

export default connectDB;