const mongoose = require('mongoose');

function main() {
    mongoose.connect('mongodb+srv://skylite:skylight@urls-backend.vp4pp.mongodb.net/?retryWrites=true&w=majority&appName=urlS-backend')
    .then((success)=>{
      console.log("Connected to a database");
    })
    .catch((err)=>{
      console.log("Error occurred on DB connecting");
      console.log(err);
    })
}

module.exports = {main}