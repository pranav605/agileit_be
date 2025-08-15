const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const User = require("../models/User");
// @route   POST /api/projects
// @desc    Create new project
router.post("/create", async (req, res) => {
  try {
    const { name, description, createdBy, members = [] } = req.body;
    const user = await User.findById(createdBy);
    console.log(user.toJSON());

    const allMembers = [{ user: createdBy, role: "admin" }, ...members];

    const project = new Project({
      name,
      description,
      createdBy,
      members: allMembers,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { currentUser, projectId } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    console.log(project);
    console.log(currentUser, project.createdBy.toString());
    
    
    if (project.createdBy.toString() !== currentUser) {
      return res.status(403).json({ error: "You do not have permission to delete this project" });
    }

    const deletedProject = await Project.findByIdAndDelete(projectId);

    // Optional: delete tasks belonging to this project
    // await Task.deleteMany({ project: projectId });

    res.json({ message: "Project deleted successfully", project: deletedProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// @route   GET /api/projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("createdBy", "name email");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/projects/:projectId
// @desc    Get specific project by ID
router.get("/:projectId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate("createdBy", "name email")
      .populate("members.user", "name email");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/projects/user/:userId
// @desc    Get all projects where user is a member
router.get("/user/:userId", async (req, res) => {
  try {
    const projects = await Project.find({ "members.user": req.params.userId })
      .populate("createdBy", "name email")
      .populate("members.user", "name email");
    console.log(projects);
    
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/users/search', async (req, res) => {
  const query = req.query.query;

  if (!query) return res.status(400).json({ error: 'Missing search query' });

  try {
    const users = await User.find({
      email: { $regex: query, $options: 'i' } // case-insensitive partial match
    }).select('email _id');

    res.json(users);
  } catch (err) {
    console.error('User search failed:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
