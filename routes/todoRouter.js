const router = require("express").Router();
const auth = require("../middleware/auth");
const Todo = require("../models/todoModel");
const moment = require("moment");

router.post("/", auth, async (req, res) => {
  try {
    const { title, date, startTime, endTime, description, catagory } = req.body;

    // validation

    if (!title) return res.status(400).json({ msg: "Title is missing" });

    if (!date) return res.status(400).json({ msg: "Date is missing" });

    if (!startTime)
      return res.status(400).json({ msg: "Start Time is missing" });

    if (!endTime) return res.status(400).json({ msg: "End Time is missing" });

    if (!description)
      return res.status(400).json({ msg: "Description is missing" });

    if (!catagory) return res.status(400).json({ msg: "Catagory is missing" });

    const newTodo = new Todo({
      title,
      date: moment(date).format("MMMM Do YYYY"),
      startTime,
      endTime,
      description,
      catagory,
      userId: req.user,
    });

    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", auth, async (req, res) => {
  const todos = await Todo.find({ userId: req.user });
  res.json(todos);
});

router.delete("/:id", auth, async (req, res) => {
  const todo = await Todo.findOne({ userId: req.user, _id: req.params.id });

  if (!todo)
    return res.status(400).json({
      msg: "No todo found with this ID that belongs to the current user",
    });

  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.json(deletedTodo);
});

router.put("/date", auth, async (req, res) => {
  const todos = await Todo.find({
    userId: req.user,
    date: req.body.date,
  });

  if (!todos)
    return res.status(400).json({
      msg: "No todo found with at this date",
    });

  res.json(todos);
});

module.exports = router;
