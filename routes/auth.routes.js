const express = require("express");
const router = express.Router();
const User = require("../models/User");
// Example: Register or login routes
router.post("/register", async (req, res) => {
  try {
    const payload = req.body;
    if (payload?.name && payload?.email && payload?.password) {
      const user = await Promise.resolve(
        User.insertOne({
          email: payload.email,
          name: payload.name,
          password: payload.password,
          image: payload?.image ? payload.image : "",
          provider: "email",
          providerId: ""
        })
      );
      res.status(200).json({ success: true, user });
    } else {
      res.status(400).json({ success: false, error: "Missing required fields" });
    }
  } catch (e) {
    res.status(500).json({ success: false, error: "Server error: " + e.message });
  }
});

router.post("/login",async (req, res) => {
  try{
    const payload = req.body;
    if( payload?.email && payload?.password){

      // Use findOne() to get a single document, not an array
      const user = await Promise.resolve(
        User.findOne({
          email: payload.email
        })
      );

      // Log the user object from findOne (it will be null if not found, or the document itself)
      console.log("Backend found user:", user);

      // Check if user was found before returning
      if (user) {
        // You can return the user object directly as it's now a single document
        res.status(200).json({success: true, user});
      } else {
        res.status(401).json({success: false, message: "Invalid credentials"});
      }
    } else {
      res.status(400).json({success: false, error: "Email and password are required"});
    }
  } catch(e){
    res.status(500).json({success: false, error: "Server error: " + e.message});
  }
});


// Example: Fetch user by email
router.get("/user", async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post('/sync', async (req, res) => {
  const { email, name, image, provider } = req.body;

  if (!email) return res.status(400).send('Missing email');

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name: name || '',
        image: image || '',
        provider: provider || 'unknown',
        createdAt: new Date(),
      });
    }

    return res.status(200).json({ id: user._id, email: user.email });
  } catch (err) {
    console.error('User sync error:', err);
    return res.status(500).send('Internal server error');
  }
});


module.exports = router;
