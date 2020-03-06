const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);

const class_schema = new mongoose.Schema({
    name : {type : String, required : true, enum : ['GLSI','DMWM','SSIR','DSEN']},
    max_student : Number,
    modules : [String]
})

const ClassRoom = mongoose.model('Class',class_schema);

module.exports.ClassRoom = ClassRoom;