import express from "express";
import { User } from "../models/user.js";
import { Destination } from "../models/destination.js";

const router = express.Router();

// Get a random destination with options for multiple choice
router.get("/random", async (req, res) => {
	try {
		const allDestinations = await Destination.find();

		if (allDestinations.length === 0) {
			return res.status(404).json({ message: "No destinations found in database" });
		}

		const randomIndex = Math.floor(Math.random() * allDestinations.length);
		const destination = allDestinations[randomIndex];

		const otherDestinations = allDestinations
			.filter((_, index) => index !== randomIndex)
			.sort(() => Math.random() - 0.5)
			.slice(0, 3);

		const options = [
			{ value: `${destination.city}, ${destination.country}`, correct: true },
			...otherDestinations.map((d) => ({
				value: `${d.city}, ${d.country}`,
				correct: false,
			})),
		].sort(() => Math.random() - 0.5);

		res.json({
			options,

			id: destination._id,
			clues: destination.clues,
		});
	} catch (error) {
		console.error("Error fetching random destination:", error);
		res.status(500).json({ message: "Server error" });
	}
});

// Check answer and return feedback
router.post("/check-answer", async (req, res) => {
	try {
		const { destinationId, selectedOption, userId } = req.body;

		if (!destinationId || !selectedOption) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		const destination = await Destination.findById(destinationId);

		if (!destination) {
			return res.status(404).json({ message: "Destination not found" });
		}

		const correctOption = `${destination.city}, ${destination.country}`;
		const isCorrect = selectedOption === correctOption;

		const feedbackArray = isCorrect ? destination.fun_fact : destination.trivia;
		const randomIndex = Math.floor(Math.random() * feedbackArray.length);
		const feedback = feedbackArray[randomIndex];

		if (userId) {
			await User.findByIdAndUpdate(userId, {
				$inc: {
					"score.correct": isCorrect ? 1 : 0,
					"score.incorrect": isCorrect ? 0 : 1,
				},
			});
		}

		res.json({
			isCorrect,
			correctAnswer: correctOption,
			feedback,
			destination: {
				city: destination.city,
				country: destination.country,
			},
		});
	} catch (error) {
		console.error("Error checking answer:", error);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
