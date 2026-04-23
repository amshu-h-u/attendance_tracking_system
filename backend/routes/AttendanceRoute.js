const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");
const { auth, checkRole } = require("../middleware/authMiddleware");


router.post("/attendance", auth, checkRole("Trainer"), async (req, res) => {
  try {
    const { batchId, date, records } = req.body;

   
    const exists = await Attendance.findOne({ batchId, date });
    if (exists) {
      return res.status(400).json({
        message: "Attendance already marked for this date"
      });
    }

    const attendance = await Attendance.create({
      batchId,
      date,
      records
    });

    res.json(attendance);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get("/attendance/:batchId", auth, async (req, res) => {
  try {
    const { batchId } = req.params;

    let records = await Attendance.find({ batchId });

   
    if (req.user.role === "Student") {
      records = records.map(record => {
        const studentRecord = record.records.find(
          r => r.studentId.toString() === req.user.id
        );

        return {
          date: record.date,
          status: studentRecord ? studentRecord.status : "Absent"
        };
      });
    }

    res.json(records);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/attendance/:batchId/percentage", auth, async (req, res) => {
  try {
    const { batchId } = req.params;

    const records = await Attendance.find({ batchId });

    let totalDays = records.length;
    let presentDays = 0;

    records.forEach(record => {
      const student = record.records.find(
        r => r.studentId.toString() === req.user.id
      );

      if (student && student.status === "Present") {
        presentDays++;
      }
    });

    const percentage =
      totalDays === 0 ? 0 : ((presentDays / totalDays) * 100).toFixed(2);

    res.json({
      totalDays,
      presentDays,
      percentage
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;