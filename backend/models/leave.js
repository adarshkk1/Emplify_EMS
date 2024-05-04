const mongoose = require('mongoose');

const Leave = mongoose.Schema({
    name: {
        type: String,
      },
      emailId: {
        type: String,
      },
      startdate: {
        type: String,
      },
      enddate: {
        type: String,
      },
      reason: {
        type: String,
      },
      status:{
        type:String,
      }
})

module.exports = mongoose.model('leave',Leave)