const express= require('express');//look for express in node module and load it
const app=express();
app.use(express.json());

app.listen(3000, ()=>{
    console.log("server started at port 3000");
});

const mongoose=require('./database/mongoose.js');

const User=require('./database/models/user.js')
const Car=require('./database/models/Car.js')
const Laptop=require('./database/models/Laptop.js')

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
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Specify the destination folder for uploaded images
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename for the uploaded image
//   }
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded image
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + '-' + file.originalname;
    cb(null, filename);
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



app.post('/cars', upload.array('images'), async (req, res) => {
  try {
    // Handle uploaded images
    const images = req.files.map(file => file.filename);
    const timestamp = new Date();

    // Extract other car data from request body
    const {selectedCategory, engineCapacity, modelYear, Mileage, Company, Vaarient, EngineType, Transmission, BodyType, accident, location, description,userId ,price} = req.body;
    // Create a new Car instance with the extracted data
    const car = new Car({
      selectedCategory,
      engineCapacity,
      modelYear,
      Mileage,
      Company,
      Vaarient,
      EngineType,
      Transmission,
      BodyType,
      accident,
      location,
      description,
      images, 
      userId,
      timestamp ,
      price
    });

    // Save the car data
    await car.save();

    res.status(201).json({ message: 'Car data saved successfully' });
  } catch (error) {
    console.error('Error saving car data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/laptops', upload.array('images'), async (req, res) => {
  try {
    const { selectedCategory,company, typeName, Ram, Weight, Touchscreen, Ips, ppi, Cpubrand, HDD, SSD, Gpubrand, os, location, description,Inches,pixels ,userId} = req.body;
    const images = req.files.map(file => file.filename); // Get filenames of uploaded images
    const timestamp = new Date();
    const laptop = new Laptop({
      selectedCategory,
      company,
      typeName,
      Ram,
      Weight,
      Touchscreen,
      Ips,
      ppi,
      Cpubrand,
      HDD,
      SSD,
      Gpubrand,
      os,
      location,
      description,
      images,
      Inches,
      pixels,
      userId,
      timestamp ,
      price
    });

    await laptop.save();
    res.status(201).json({ message: 'Laptop data saved successfully' });
  } catch (error) {
    console.error('Error saving laptop data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/cars/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cars = await Car.find({ userId });
    res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/laptops/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const laptops = await Laptop.find({ userId });
    res.status(200).json(laptops);
  } catch (error) {
    console.error('Error fetching laptops:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})



app.get('/carsAll', async (req, res) => {
  try {
      const cars = await Car.find();
      res.status(200).json(cars);
  } catch (error) {
      console.error('Error fetching cars:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// New endpoint to fetch all laptops
app.get('/laptopsAll', async (req, res) => {
  try {
      const laptops = await Laptop.find();
      res.status(200).json(laptops);
  } catch (error) {
      console.error('Error fetching laptops:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


// New endpoint to search for a document based on the selected category
app.get('/search/:selectedCategory/:id', async (req, res) => {
  try {
    const selectedCategory = req.params.selectedCategory;
    const id = req.params.id;

    // Determine the collection based on the selected category
    let Model;
    if (selectedCategory === 'cars') {
      Model = Car;
    } else if (selectedCategory === 'laptops') {
      Model = Laptop;
    } else {
      return res.status(400).json({ error: 'Invalid selected category' });
    }

    // Search for the document in the determined collection
    const document = await Model.findOne({ _id: id });

    if (document) {
      // Document found, send it in the response
      res.status(200).json(document);
    } else {
      // Document not found in the specified collection
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error('Error searching document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

