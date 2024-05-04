const mongoose = require('mongoose');

const Employee = mongoose.Schema({
    firstname: {
        type: String,
      },
      email: {
        type: String,
      },
      department: {
        type: String,
      },
      lastname: {
        type: String,
      },
      birthdate: {
        type: String,
      },
      gender: {
        type: String,  
      },
      education: {
        type: String,
      },
      company: {
        type: String,
      },
      jobExperience: {
        type: String,
      },
      salary: {
        type: String,
      },
      profile: {
        type: String,
      },
    data : {
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('employee',Employee)