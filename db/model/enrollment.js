const mongoose = require('mongoose');

const enrol = new mongoose.model('enrol',{
    
    username : {
        type: String,
        required : true,
    },
    program : {
        type : String,
        // unique:true,
        required:true,
    },
    sessionCompleted : {
        type:Number,
        default:0,
    }
})

module.exports = enrol;