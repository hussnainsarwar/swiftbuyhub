const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
  user_name:{
    type:String,
    trim:true,
    minlength:3,
    required: true
  },
  e_mail:{
    type:String,
    trim:true,
    minlength:3,
    unique: true ,
    required: true
  },
  password:{
    type:String,
    trim:true,
    minlength:3,
    required: true
  },
  contact:{
    type:String,
    trim:true,
    minlength:10,
    // required: true
  },
  role: {
    type: String,
    trim: true,
    minlength: 3,
    default: 'user', // Set default value to 'user'
  },
  profilepic: {
    type: String,
    default: '', // Set default value to an empty string
  },
  

});


const User=mongoose.model('user',userSchema);//here TaskList inside bracket is database name collection and TaskListSchema is the schema for it

module.exports=User; 