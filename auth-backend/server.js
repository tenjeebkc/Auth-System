const express = require('express');
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());   // Allows server to read json data from React


// We will build this next: The Login route
app.post('/api/register', async(req, res) => {
    const {email, password} = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(`Saving user: ${email} with Hash: ${hashedPassword}`);

    // Next Step: Save this to a database!
    res.status(201).send("User password hashed and ready to save!");
})

const port = 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
  