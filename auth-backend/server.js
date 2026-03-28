const express = require('express');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
const User = require("./models/User")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")


const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());   // Allows server to read json data from React

const MongoURL = "mongodb+srv://tenjeeb15_db:auth-system-ok@cluster1.1czhxqa.mongodb.net/?appName=Cluster1"

// Connect to MongoDB
mongoose.connect(MongoURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Connection error:", err))

// Register Route
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   // Create and Save the user
   const newUser = new User({
    email: email,
    password: hashedPassword
   })

   const savedUser = await newUser.save();

    res.status(201).json({message: "User saved to database!", userId: savedUser._id})
  
  }catch(err) {
    res.status(500).json({error: "Failed to register user (Email might already exits)"})
  }
  });

  // Login Route
  app.post("/api/login", async (req, res) =>{
    try{
      const {email, password} = req.body;

      // 1. Find the user by email
      const user = await User.findOne({ email });
      if(!user) return res.status(400).json({ error: "User not found" });
    
      // 2. Compare the typed password with the hashed one in DB
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) return res.status(400).json({ error: "Invalid credentials" })

      // 3. Create a Token (The "Digital Badge")
      // This token contains the user's ID and is signed with a secret key
      const token = jwt.sign(
        { id: user._id },  // Payload
        "YOUR_SECRET_KEY",  // Secret key(only your server knows)    // In production, move this to .env
        { expiresIn: "1h" } // Options
      );

      res.json({
        message: "Login successful!",
        token: token,
        user: { id: user._id, email: user.email }
      })
    } catch (err){
      res.status(500).json({ error: "Server error"})
    }
  })

const port = 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
