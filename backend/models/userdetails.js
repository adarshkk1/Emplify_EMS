const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: {
    type: String,
  
  },
  emailId: {
    type: String,
   
  },
  mobileNo: {
    type: String,
  
  },
  password: {
    type: String,
  
  }
});

const Userdetails = mongoose.model('Userdetails', User);

module.exports = Userdetails;