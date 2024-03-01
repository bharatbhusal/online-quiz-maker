const mongoose = require("mongoose");
const env = require("../utils/validateEnv");

const uri = env.MONGO_CONNECTION_STRING;

const connectDB = async () => {
    try
    {
        await mongoose.connect(uri);

        console.log("Connected to MongoDB!");
    } catch (error)
    {
        console.log(`Couldn't connect to database.\n${error.message}`);
    }
};

module.exports = connectDB;
