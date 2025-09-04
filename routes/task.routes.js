const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task");

// Create a new task
router.post("/create", async (req, res) => {
  try{
    const {title, description, status, priority, dueDate, createdBy, assignedToId, project, sprint, tags} = req.body;
    const assignedTo = await User.findById(assignedToId);
    console.log("Assigned To:", assignedTo.toJSON());

    const newTask = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      createdBy,
      assignedTo,
      project,
      sprint,
      tags
    });

    await newTask.save();
    console.log("New Task saved:", newTask)
    res.status(201).json(newTask);
  } catch (err){
    console.error(err);
    res.status(500).json({error : "Server error, couldn't create the task"});
  }
});

// Get all tasks for a project
router.get("/project/:projectId", async (req, res) => {
  try{
    const tasks = await Task.find({project: req.params.projectId}).populate("assignedTo","name");
    // console.log("TASKS:",tasks)
    if (!tasks) {
      return res.status(404).json({ error: "Tasks not found for this project" });
    }

    res.json(tasks);
  } catch (error){
    console.error(error);
    res.status(500).json({error: "Server error, couldn't fetch tasks"})
  }
});

// Get a single task by ID
router.get("/:taskId", async (req, res) => {
  try{
    const task = await Task.findOne({_id: req.params.taskId});
    if(!task){
      return res.status(404).json({error: "Task not found with this id"});
    }

    res.json(task);
  } catch(error){
    console.error(error);
    res.status(500).json({error: "Server error, couldn't fetch task details"})
  }
});

//Get the tasks assigned to a user
router.get("/getTasks/:email", async (req, res) => {
  try{
    const userEmail = req.params.email;

    // Find the user first
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Then find tasks linked to that user
    const tasks = await Task.find({ assignedTo: user._id });
    if(!tasks){
      return res.status(404).json({error: "Tasks not found for this user"});
    }

    res.status(200).send(tasks);
  } catch (error){
    console.error(error);
    res.status(500).json({error: "Server error, couldn't fetch tasks"});
  }
})

//update a task
router.post("/update/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const changes = req.body;

    // Find by ID and update, returning the new document
    const task = await Task.findByIdAndUpdate(taskId, changes, { new: true });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, could not update the task" });
  }
});


module.exports = router;
