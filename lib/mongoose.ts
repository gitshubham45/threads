import mongoose from "mongoose";

let isConnected = false; // variable to check connection status

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) return console.log("Mongo db connection not successful");

    if (isConnected) return console.log("already connected to mongodb");

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true;
        console.log("connected to mongodb");
    } catch (err) {
        console.log(err);
    }
}   
