const express= require('express');//look for express in node module and load it
const app=express();
app.use(express.json());

app.listen(3000, ()=>{
    console.log("server started at port 3000");
});

const mongoose=require('./database/mongoose.js');

const User=require('./database/models/user.js')

const jwt = require('jsonwebtoken');
const multer = require('multer');

 
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*'); //frontend request allow any frontend

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// image upload
// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename for the uploaded image
  }
});

const upload = multer({ storage: storage });



app.post('/register', async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ e_mail: req.body.email });

    if (existingUser) {
      // If the email already exists, return an error response
      return res.status(400).json({ error: 'Email already exists' });
    }

    // If the email doesn't exist, proceed to create a new user
    const newUser = new User({
      user_name: req.body.username,
      e_mail: req.body.email,
      password: req.body.password,
      contact: req.body.contact
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { e_mail, password } = req.body;
    console.log(e_mail)

    // Find the user by email
    const user = await User.findOne({ e_mail });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored password
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // For simplicity, you might want to send back user details in response
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
