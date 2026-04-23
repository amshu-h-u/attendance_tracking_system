const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
    required: true
  },
  date: {
    type: Date, 
    default: Date.now
  },
  records: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      status: {
        type: String,
        enum: ["Present", "Absent"],
        default: "Absent"
      }
    }
  ]
}, { timestamps: true });


module.exports = mongoose.model("Attendance", attendanceSchema);