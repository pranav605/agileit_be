// // server/routes/tasks.js
// const express = require('express');
// const router = express.Router();
// const Task = require('../models/Task');

// // GET all tasks
// router.get('/', async (req, res) => {
//   const tasks = await Task.find();
//   res.json(tasks);
// });

// // POST create a task
// router.post('/', async (req, res) => {
//   const newTask = new Task(req.body);
//   await newTask.save();
//   res.status(201).json(newTask);
// });

// module.exports = router;
