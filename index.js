import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Import routes
import userRoutes from "./routes/user.js";
// import seedRoutes from "./routes/seed.js";
import destinationRoutes from "./routes/destination.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Setup
app.use(cors());
app.use(express.json());

// Connecting to MongoDB
const MONGODB_URI = process.env.MONGODB_API_KEY;

if (!MONGODB_URI) {
	console.error("MONGODB_API_KEY is not defined in environment variables");
	process.exit(1);
}

mongoose
	.connect(MONGODB_URI, {})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Could not connect to MongoDB:", err));

// Routes
app.use("/api/users", userRoutes);
// app.use("/api/seed", seedRoutes);
app.use("/api/destinations", destinationRoutes);

// Starting server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

export default app;
