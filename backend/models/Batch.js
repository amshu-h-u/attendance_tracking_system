const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  name: String,
  institutionId: String,
  trainerIds: [String],
  studentIds: [String]
});

module.exports = mongoose.model("Batch", batchSchema);