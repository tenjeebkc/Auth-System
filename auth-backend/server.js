const express = require('express');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
const User = require("./models/User")
const dotenv = require("dotenv")

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

   // Create and Save th user
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

const port = 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
