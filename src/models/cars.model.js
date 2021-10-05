const mongoose = require("mongoose")

const Cars = mongoose.model(
    "Cars",
    new mongoose.Schema({
        marque: String,
        descr:String,
        matricule: String,
        photo: String, 
        createdAt:{
            type:Date,
            default: Date.now()
        },
        updatedAt:{
            type:Date,
            default: Date.now()
        }
    })
);

module.exports = Cars;