const Task = require("../models/task");
const express = require("express");
const router = express.Router();

// CREATE task
router.post("/", async (req, res) => {
  try {
    const task = await new Task(req.body).save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// GET all tasks  ✅ IMPORTANT FIX HERE
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks); // ALWAYS array
  } catch (error) {
    console.error(error);
    res.status(500).json([]); // ❗ NEVER {}
  }
});

// UPDATE task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Update failed" });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
