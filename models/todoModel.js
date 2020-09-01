const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  done: { type: Boolean },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  description: { type: String, required: true },
  catagory: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = Todo = mongoose.model("todo", todoSchema);
