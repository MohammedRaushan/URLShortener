var mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true,
        
    },
    actualUrl:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    clicks:{
        type:Number
    }
})

const Link = mongoose.model('link',linkSchema)


module.exports = Link