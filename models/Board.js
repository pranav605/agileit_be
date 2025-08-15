const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  name: String,
  columns: [{ type: String }], // e.g., ['To Do', 'In Progress', 'Done']
});

module.exports = mongoose.model("Board", BoardSchema);
