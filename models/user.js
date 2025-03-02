import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
	createdAt: { type: Date, default: Date.now },
	username: { type: String, required: true, unique: true },
	score: {
		correct: { type: Number, default: 0 },
		incorrect: { type: Number, default: 0 },
	},
	invitationCode: { type: String, unique: true, default: () => uuidv4() },
});

export const User = mongoose.model("User", userSchema);
