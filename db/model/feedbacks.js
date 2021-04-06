const mongoose = require('mongoose');

const feedback = new mongoose.model('feedback',{
    
    email : {
        type: String,
        required : true,
    },
    feedback : {
        type : String,
        unique:true,
        // required:true,
    }
})

module.exports = feedback;