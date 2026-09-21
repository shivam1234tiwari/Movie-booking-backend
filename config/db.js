import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB is Connected");
    } catch (error) {
        console.error("Server Error:", error);
        process.exit(1);
    }
};

export default ConnectDB;