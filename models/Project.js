const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: {
        type: String,
        enum: ["admin", "editor", "viewer"],
        default: "viewer"
      }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  numberOfSprints: { type: Number },
});

module.exports = mongoose.model("Project", ProjectSchema);
