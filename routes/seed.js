// import express from "express";
// import { Destination } from "../models/destination.js";
// import destinationsData from "../seed_data.json" assert { type: "json" };

// const router = express.Router();

// // Data seeding route (for development purposes)
// router.post("/seed-data", async (req, res) => {
// 	try {
// 		const count = await Destination.countDocuments();
// 		if (count > 0) {
// 			return res.json({ message: "Data already seeded", count });
// 		}

// 		await Destination.insertMany(destinationsData);

// 		res.json({ message: "Data seeded successfully", count: destinationsData.length });
// 	} catch (error) {
// 		console.error("Error seeding data:", error);
// 		res.status(500).json({ message: "Server error" });
// 	}
// });

// export default router;
