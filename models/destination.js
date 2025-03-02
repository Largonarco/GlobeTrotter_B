import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
	city: String,
	country: String,
	clues: [String],
	trivia: [String],
	fun_fact: [String],
});

export const Destination = mongoose.model("Destination", destinationSchema);
