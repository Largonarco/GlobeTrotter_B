import express from "express";
import { User } from "../models/user.js";

const router = express.Router();

// Create new user
router.post("/", async (req, res) => {
	try {
		let response = null;
		const { username } = req.body;

		if (!username) {
			return res.status(400).json({ message: "Username is required" });
		}

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			response = {
				id: existingUser._id,
				score: existingUser.score,
				username: existingUser.username,
				invitationCode: existingUser.invitationCode,
			};
		} else {
			const user = new User({ username });
			await user.save();

			response = {
				id: user._id,
				score: user.score,
				username: user.username,
				invitationCode: user.invitationCode,
			};
		}

		res.status(201).json(response);
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ message: "Server error" });
	}
});

// Get user by invitation code
router.get("/invitation/:code", async (req, res) => {
	try {
		const { code } = req.params;

		const user = await User.findOne({ invitationCode: code });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const response = {
			id: user._id,
			score: user.score,
			username: user.username,
		};

		res.json(response);
	} catch (error) {
		console.error("Error finding user by invitation code:", error);
		res.status(500).json({ message: "Server error" });
	}
});

// Update user score
router.patch("/:id/score", async (req, res) => {
	try {
		const { id } = req.params;
		const { correct, incorrect } = req.body;

		const user = await User.findByIdAndUpdate(
			id,
			{
				"score.correct": correct,
				"score.incorrect": incorrect,
			},
			{ new: true }
		);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const response = {
			id: user._id,
			username: user.username,
			score: user.score,
		};

		res.json(response);
	} catch (error) {
		console.error("Error updating user score:", error);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
