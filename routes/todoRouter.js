const router = require("express").Router();
const auth = require("../middleware/auth");
const Todo = require("../models/todoModel");

router.post("/", auth, async (req, res) => {
  try {
    const { title, date, startTime, endTime, description, catagory } = req.body;

    // validation

    if (!title) return res.status(400).json({ msg: "title is missing" });

    if (!date) return res.status(400).json({ msg: "Date is missing" });

    if (!startTime)
      return res.status(400).json({ msg: "Start Time is missing" });

    if (!endTime) return res.status(400).json({ msg: "End Time is missing" });

    if (!description)
      return res.status(400).json({ msg: "Description is missing" });

    if (!catagory) return res.status(400).json({ msg: "Catagory is missing" });

    const newTodo = new Todo({
      title,
      date,
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

module.exports = router;
