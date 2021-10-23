let mongoose = require ('mongoose');

//create a model class
let businessModel= mongoose.Schema(
    {
         username: String,
         phone: Number,
         email: String
    },
    {
        collection: "user"
    }
);

module.exports = mongoose.model('Business', businessModel);