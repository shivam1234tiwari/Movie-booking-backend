import express from "express"
import dotenv from 'dotenv'
import ConnectDB from "./config/db.js";

dotenv.config();

// MongoDB connect call
ConnectDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Hello it is movie",
        success: true
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});