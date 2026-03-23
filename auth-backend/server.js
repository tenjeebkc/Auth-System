const express = require('express')
const cors = require("cors")
const app = express()

app.use(cors());
app.use(express.json());   // Allows server to read json data from React


app.get('/', (req, res) => {
    res.send('Auth Server is running')
})

// We will build this next: The Login route
app.post('/api/login', (req, res) => {
    const {email, password} = req.body;
    console.log(`Login attempt for : ${email}`);
    
    // For now, lets send a fake success message
    res.json({message: "Server received you data", status:"success"});
    
})

const port = 3000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
