const express = require("express");
const router = express.Router();

const { createBatch } = require("../controller/batchController.js");
const { auth, checkRole } = require("../middleware/authMiddleware.js");
const Batch = require("../models/Batch");


router.get("/test-trainer", auth, checkRole("Trainer"), (req, res) => {
  res.json({
    message: "Trainer is working",
    user: req.user
  });
});


router.post(
  "/",
  auth,
  checkRole("Trainer", "Institution"),
  createBatch
);


router.get("/", auth, async (req, res) => {
  try {
    let batches;

    if (req.user.role === "Student") {
      batches = await Batch.find({
        studentIds: req.user.id
      });

    } else if (req.user.role === "Trainer") {
      batches = await Batch.find({
        trainerIds: req.user.id
      });

    } else if (req.user.role === "Institution") {
      batches = await Batch.find({
        institutionId: req.user.id
      });

    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    res.json(batches);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/join/:id", auth, checkRole("Student"), async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    if (batch.studentIds.includes(req.user.id)) {
      return res.status(400).json({ message: "Already joined" });
    }

    batch.studentIds.push(req.user.id);
    await batch.save();

    res.json({ message: "Joined successfully", batch });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post("/leave/:id", auth, checkRole("Student"), async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    batch.studentIds = batch.studentIds.filter(
      id => id !== req.user.id
    );

    await batch.save();

    res.json({ message: "Left batch" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;





