var mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    urls:{
        type:Array
    }
})


module.exports = linkSchema