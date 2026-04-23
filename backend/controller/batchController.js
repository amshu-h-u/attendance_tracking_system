// const Batch = require("../models/Batch.js");

// // Create batch (Trainer / Institution)
// exports.createBatch = async (req, res) => {
//   try {
//     const { name } = req.body;

//     const batch = await Batch.create({
//       name,
//       trainerIds: [req.user.id]
//     });

//     res.json(batch);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };