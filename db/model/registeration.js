const mongoose = require('mongoose');

const registeration = new mongoose.model('resgistration',{
    fname : {
        type:String,
        required : true,
    },
    lname : {
        type:String,
        required : true,
    },
    email : {
        type: String,
        required : true,
    },
    username : {
        type : String,
        unique:true,
        required:true,
    },
    password: {
        type :String,
        require:true,
    }
})

module.exports = registeration;