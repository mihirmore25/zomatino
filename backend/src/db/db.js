import mongoose from "mongoose";

export function connectDB() {
    mongoose.connect(process.env.MONGODB_URI).then((db) => {
        console.log(`MongoDB Connected Successfully on [PORT]:${db.connection.port} [DB]:${db.connection.name}`);
    }).catch((error) => {
        console.log(`MongoDB connection error: ${error}`);  
    })
}



