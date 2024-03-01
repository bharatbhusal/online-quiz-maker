const express = require("express");
const cors = require("cors");

const env = require("./utils/validateEnv")
const connectDB = require("./config/dbConnection");
const authRoutes = require("./routes/authRoutes"); // Import authRoutes
const userRoutes = require("./routes/userRoutes");
const corsOptions = require("./config/corsOptions");

// Initialize Express application
const app = express();

app.use(cors(corsOptions));

// Connect to MongoDB database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes); // Use authRoutes for authentication endpoints
app.use("/users", userRoutes);

// Define a basic route for testing
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Start the server
const PORT = env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server trying to connect on port ${PORT}`);
});
