const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  image: { type: String }, // profile picture
  password: {type: String},
  provider: { type: String }, // "google", "github", "email"
  providerId: { type: String }, // ID from Google/GitHub
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
  