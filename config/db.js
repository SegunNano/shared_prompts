import mongoose from "mongoose";

let isConnected = false;


const connectDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('Already Connected to mongoDB :)');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Succesfully Connected to mongoDB :)');
        isConnected = true;
    } catch (err) {
        console.error(`Error Message: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB; 